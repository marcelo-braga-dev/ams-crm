<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Setores;
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
        $setor = $request->setor ?? 1;

        $setores = (new Setores())->get();

        $metaVendas = (new VendasService())->metaVendas($mes, $ano, $setor);
        $metasVendasAnual = (new VendasService())->metaVendasAnual($ano, $setor);

        return Inertia::render('Admin/Dashboard/Vendas/Index',
            compact('metaVendas', 'metasVendasAnual',
                 'mes', 'ano', 'setores', 'setor'));
    }
}
