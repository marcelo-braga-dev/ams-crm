<?php

namespace App\Http\Controllers\Geral\Pedidos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function create(Request $request)
    {
        $leadId = $request->input('lead_id');

        return Inertia::render('Geral/Pedidos/Create');
    }
}
