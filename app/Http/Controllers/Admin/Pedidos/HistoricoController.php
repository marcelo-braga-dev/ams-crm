<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Services\Pedidos\PedidosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricoController extends Controller
{
    public function index()
    {
        $pedidos = (new PedidosService())->todosPedidos();

        return Inertia::render('Admin/Pedidos/Historicos/Index', compact('pedidos'));
    }
}
