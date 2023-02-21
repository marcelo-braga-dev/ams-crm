<?php

namespace App\Http\Controllers\Admin\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CanceladoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->getDadosPedido($id);

        return Inertia::render('Admin/Pedidos/Cancelado/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->cancelado($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
