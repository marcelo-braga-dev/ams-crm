<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConferenciaController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getV2($id);

        return Inertia::render('Supervisor/Pedidos/Conferencia/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        if ($request->get('reprovado')) {
            (new PedidoUpdateStatus())->reprovado($id, $request->get('reprovado'));
        } else (new PedidoUpdateStatus())->conferencia($id);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
