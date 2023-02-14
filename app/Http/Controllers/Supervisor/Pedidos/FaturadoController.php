<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturadoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->getDadosPedido($id);

        return Inertia::render('Supervisor/Pedidos/Faturado/Show', compact('pedido'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->faturado($id);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
