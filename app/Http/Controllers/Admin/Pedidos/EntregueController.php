<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\Pedido;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntregueController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->newQuery()->findOrFail($id);

        return Inertia::render('Admin/Pedidos/Entregue/Show',
            compact('pedido'));
    }
}
