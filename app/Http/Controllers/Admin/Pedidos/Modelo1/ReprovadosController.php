<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\PedidosArquivos;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Services\Fornecedores\FornecedoresService;
use App\src\Pedidos\PedidoUpdateStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReprovadosController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->find($id);
        $fornecedores = (new FornecedoresService())->fornecedores($pedido->setor_id);
        $preco = convert_float_money($pedido->preco_venda);

        if ($pedido->modelo == 2) {
            $cliente = (new LeadsANTIGO())->getDados($pedido->lead_id);
            return Inertia::render('Admin/Pedidos/Reprovado/Modelo2/Edit',
                compact('pedido', 'cliente', 'preco', 'fornecedores', 'preco'));
        }
        $cliente = (new PedidosClientes())->find($pedido->id);
        $pedidosImagens = (new PedidosImagens())->getImagens($pedido->id);
        $endereco = (new Enderecos())->get($cliente->endereco);

        $img['rg'] = (new PedidosArquivos())->getRG($pedido->id)[0]['url'] ?? $pedidosImagens->url_rg;
        $img['cpf'] = (new PedidosArquivos())->getCPF($pedido->id)[0]['url'] ?? $pedidosImagens->url_cpf;
        $img['cnh'] = (new PedidosArquivos())->getCNH($pedido->id)[0]['url'] ?? $pedidosImagens->url_cnh;
        $img['residencia'] = (new PedidosArquivos())->getResidencia($pedido->id)[0]['url'] ?? $pedidosImagens->url_comprovante_residencia;

        return Inertia::render('Admin/Pedidos/Reprovado/Modelo1/Edit',
            compact('pedido', 'cliente', 'img', 'fornecedores', 'endereco'));
    }

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            $pedido = (new Pedidos())->find($id);

            if ($pedido->modelo == 1) {
                (new PedidosClientes())->atualizar($id, $request);
            }

            if ($pedido->modelo == 2) {
                (new LeadsANTIGO())->atualizar($id, $request);
            }

            (new PedidosArquivos())->setRG($id, $request);
            (new PedidosArquivos())->setCPF($id, $request);
            (new PedidosArquivos())->setCNH($id, $request);
            (new PedidosArquivos())->setResidencia($id, $request);
            (new PedidosArquivos())->setCNPJ($id, $request);
            (new PedidosImagens())->updateRevisao($id, $request);

            $prazo = (new ConferenciaStatusPedido())->getPrazo();
            (new Pedidos())->updateDados($id, $request, $prazo);
        } catch (\DomainException|QueryException|\ErrorException $exception) {
            DB::rollBack();
            modalErro('Falha na atualização.');
            return redirect()->back();
        }
        DB::commit();

        (new PedidoUpdateStatus())->setConferencia($id, $request->get('motivo'));

        modalSucesso("Dados Atualizados com sucesso!");
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
