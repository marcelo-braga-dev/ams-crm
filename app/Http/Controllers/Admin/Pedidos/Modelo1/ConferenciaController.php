<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\PedidosProdutos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConferenciaController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);

        $clienteDuplicado = (new PedidosClientes())
            ->where('cpf', $pedido['cliente']['cpf'])
            ->orWhere('cnpj', $pedido['cliente']['cnpj'])
            ->pluck('pedido_id');

        return Inertia::render('Admin/Pedidos/Conferencia/Show',
            compact('pedido', 'produtos', 'clienteDuplicado'));
    }

    public function update($id, Request $request)
    {
        if ($request->get('reprovado')) {
            (new PedidoUpdateStatus())->reprovado($id, $request->get('reprovado'));
        } elseif ($request->encomenda) {
            (new PedidoUpdateStatus())->setEncomenda($id, $request->prazo);
        } else (new PedidoUpdateStatus())->setLancado($id);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
