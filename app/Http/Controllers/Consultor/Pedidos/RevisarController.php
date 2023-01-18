<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\Fornecedores;
use App\Models\Integradores;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
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
        $pedido = (new Pedidos())->newQuery()->findOrFail($id);
        $cliente = (new PedidosClientes())->getCliente($pedido->id);
        $img = (new PedidosImagens())->getImagens($pedido->id);
        $fornecedores = (new Fornecedores())->newQuery()->get();
        $endereco = (new Enderecos())->get($cliente->endereco);
        $integradores = (new Integradores())->getUsuario();

        return Inertia::render('Consultor/Pedidos/Revisar/Edit',
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
        } catch (\DomainException|QueryException $exception) {
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
