<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Services\Pedidos\PedidosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricoController extends Controller
{
    public function index()
    {
        $pedidos = (new PedidosService())->historicoDados();

        return Inertia::render('Consultor/Pedidos/Historicos/Index', compact('pedidos'));
    }
}
