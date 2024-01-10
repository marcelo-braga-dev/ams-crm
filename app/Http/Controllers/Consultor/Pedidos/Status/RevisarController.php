<?php

namespace App\Http\Controllers\Consultor\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\Pedidos;
use App\Models\PedidosImagens;
use App\Services\Fornecedores\FornecedoresService;
use App\src\Pedidos\PedidoUpdateStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RevisarController extends Controller
{
    public function edit($id)
    {
        $fornecedores = (new FornecedoresService())->fornecedores(auth()->user()->setor);

        $pedido = (new Pedidos())->find($id);
        $endereco = '';
//        if ($cliente->endereco ?? null) $endereco = (new Enderecos())->get($cliente->endereco);
        $preco = convert_float_money($pedido->preco_venda); //

        if ($pedido->modelo == 2) {
            $cliente = (new Leads())->getDados($pedido->lead_id);
            return Inertia::render('Consultor/Pedidos/Revisar/Modelo2/Edit',
                compact('pedido', 'cliente', 'preco', 'fornecedores', 'preco'));
        }

        $img = (new PedidosImagens())->getImagens($pedido->id);

        return Inertia::render('Consultor/Pedidos/Revisar/Modelo1/Edit',
            compact('pedido', 'img', 'fornecedores', 'endereco'));
    }

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            (new PedidosImagens())->updateRevisao($id, $request);
            $prazo = (new ConferenciaStatusPedido())->getPrazo();
            (new Pedidos())->updateDados($id, $request, $prazo);
        } catch (\DomainException|QueryException|\ErrorException $exception) {
            DB::rollBack();
            print_pre($exception->getMessage());
            modalErro('Falha na atualização.');
            return redirect()->back();
        }
        DB::commit();

        (new PedidoUpdateStatus())->revisar($id, $request->get('motivo'));

        modalSucesso("Dados Atualizados com sucesso!");
        return redirect()->route('consultor.pedidos.index');
    }
}
