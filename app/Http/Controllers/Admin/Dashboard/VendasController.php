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
    public function index()
    {
        $valores = (new ValoresService())->dados();
        $metaVendas = (new VendasService())->metaVendas();
        $topConsultores = (new TopVendasService())->consultores();
        $topCompradores = (new TopVendasService())->integradores();
        $vendasMensais = (new VendasMensaisService())->vendas($valores['meta_float']);

        return Inertia::render('Admin/Dashboard/Vendas/Index',
            compact('metaVendas', 'topConsultores', 'topCompradores', 'valores',
                'vendasMensais'));
    }
}
