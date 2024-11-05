<?php

namespace App\Http\Controllers\Admin\Pedidos\Relatorios;

use App\Http\Controllers\Controller;
use App\Services\Pedidos\PlanilhaProdutos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendasController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Relatorios/Index');
    }

    public function gerarPlanilhaPedidos(Request $request)
    {
        return response()->json((new PlanilhaProdutos())->gerar($request->dataInicio, $request->dataFim, $request->setor));
    }
}
