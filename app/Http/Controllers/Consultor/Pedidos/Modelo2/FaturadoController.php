<?php

namespace App\Http\Controllers\Consultor\Pedidos\Modelo2;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturadoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);

        return Inertia::render('Consultor/Pedidos/Modelo2/Faturado/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {

        (new PedidoUpdateStatus())->setEntregue($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('consultor.pedidos.index');
    }
}
