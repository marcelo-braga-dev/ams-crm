<?php

namespace App\Http\Controllers\Supervisor\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use Inertia\Inertia;

class EntregueController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->newQuery()->findOrFail($id);

        return Inertia::render('Supervisor/Pedidos/Entregue/Show',
            compact('pedido'));
    }
}
