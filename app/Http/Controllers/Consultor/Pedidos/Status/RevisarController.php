<?php

namespace App\Http\Controllers\Consultor\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Clientes;
use App\Models\Enderecos;
use App\Models\Integradores;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
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
        $pedido = (new Pedidos())->find($id);
        $cliente = $pedido->cliente ?
            (new Clientes())->getCliente($pedido->cliente) :
            (new PedidosClientes())->getCliente($pedido->id);

        $img = (new PedidosImagens())->getImagens($pedido->id);

        $endereco = '';
        if ($cliente->endereco ?? null) $endereco = (new Enderecos())->get($cliente->endereco);
        $integradores = (new Integradores())->getUsuario();

        $fornecedores = (new FornecedoresService())->fornecedores(auth()->user()->setor);

        $preco = convert_float_money($pedido->preco_venda);

        if ($pedido->cliente) return Inertia::render('Consultor/Pedidos/Revisar/Modelo2/Edit',
        compact('pedido', 'cliente', 'preco', 'fornecedores', 'preco'));

        return Inertia::render('Consultor/Pedidos/Revisar/Modelo1/Edit',
            compact('pedido', 'cliente', 'img', 'fornecedores', 'endereco', 'integradores'));
    }

    public function update($id, Request $request)
    {
        DB::beginTransaction();
        try {
            $prazo = (new ConferenciaStatusPedido())->getPrazo();
            (new Pedidos())->updateDados($id, $request, $prazo);
            (new PedidosClientes())->updateDados($id, $request);
            (new PedidosImagens())->updateDados($id, $request);
        } catch (\DomainException|QueryException|\ErrorException $exception) {
            DB::rollBack();
            modalErro('Falha na atualização.');
            return redirect()->back();
        }
        DB::commit();

        (new PedidoUpdateStatus())->revisar($id, $request->get('motivo'));

        modalSucesso("Dados Atualizados com sucesso!");
        return redirect()->route('consultor.pedidos.index');
    }
}
