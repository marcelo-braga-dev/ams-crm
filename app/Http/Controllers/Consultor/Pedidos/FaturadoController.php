<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosImagens;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturadoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);

        return Inertia::render('Consultor/Pedidos/Faturado/Show',
            compact('pedido'));
    }
}
