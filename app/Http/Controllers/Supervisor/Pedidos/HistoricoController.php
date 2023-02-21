<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Services\Pedidos\PedidosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricoController extends Controller
{
    public function index()
    {
        $pedidos = (new PedidosService())->todosPedidos(setor_usuario_atual());

        return Inertia::render('Supervisor/Pedidos/Historicos/Index', compact('pedidos'));
    }
}
