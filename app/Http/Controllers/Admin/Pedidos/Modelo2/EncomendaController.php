<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo2;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosProdutos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EncomendaController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);

        return Inertia::render('Admin/Pedidos/Modelo2/Encomenda/Show',
            compact('pedido', 'produtos'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->setLancado($id);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
