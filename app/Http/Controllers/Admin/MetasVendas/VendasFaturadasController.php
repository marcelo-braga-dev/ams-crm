<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Http\Controllers\Controller;
use App\Models\PedidosFaturamentos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendasFaturadasController extends Controller
{
    public function index(Request $request)
    {
        $periodo = $request->mes . '/'. $request->ano;
        $vendas = (new PedidosFaturamentos())->faturadosPeriodo($request->id, $request->mes, $request->ano);
        $usuario = (new User())->get($request->id);

        return Inertia::render('Admin/MetasVendas/VedasFaturadas/Index',
            compact('vendas', 'usuario', 'periodo'));
    }
}
