<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Setores;
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

        return Inertia::render('Admin/Dashboard/Vendas/Index',
            compact(
                 'mes', 'ano', 'setores', 'setor'));
    }

    public function registros(Request $request) {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $setor = $request->setor ?? 1;

        $metaVendas = (new VendasService())->metaVendas($mes, $ano, $setor);
        $metasVendasAnual = (new VendasService())->metaVendasAnual($ano, $setor);

        return response()->json(['vedas_metas' => $metaVendas, 'vedas_metas_anual' => $metasVendasAnual]);
    }
}
