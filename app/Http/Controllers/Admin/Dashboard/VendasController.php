<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Dashboard\Vendas\TopVendasService;
use App\Services\Dashboard\Vendas\ValoresService;
use App\Services\Dashboard\Vendas\VendasMensaisService;
use App\Services\Dashboard\Vendas\VendasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendasController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $valores = (new ValoresService())->dados($mes, $ano);
        $metaVendas = (new VendasService())->metaVendas($mes, $ano);
        $topConsultores = (new TopVendasService())->consultores($mes, $ano);
        $topCompradores = (new TopVendasService())->integradores($mes, $ano);
        $vendasMensais = (new VendasMensaisService())->vendas($valores['meta_float'], $ano);

        return Inertia::render('Admin/Dashboard/Vendas/Index',
            compact('metaVendas', 'topConsultores', 'topCompradores', 'valores',
                'vendasMensais', 'mes', 'ano'));
    }
}
