<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CanceladoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->getV2($id);

        return Inertia::render('Supervisor/Pedidos/Cancelado/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->cancelado($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
