<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Pedidos;
use Illuminate\Http\Request;
use App\Models\PedidosFaturamentos;
use App\Http\Controllers\Controller;

class VendasFaturadasController extends Controller
{
    public function index(Request $request)
    {
        $periodo = $request->mes . '/'. $request->ano;
        $usuario = (new User())->get($request->id);
        $vendas = (new PedidosFaturamentos())->faturadosPeriodo($request->id, $request->mes, $request->ano);

        return Inertia::render('Admin/MetasVendas/VedasFaturadas/Index',
            compact('vendas', 'usuario', 'periodo'));
    }
}
