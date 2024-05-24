<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Setores;
use App\Models\User;
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
//        print_pre($metaVendas);

        return Inertia::render(
            'Admin/Dashboard/Vendas/Index',
            compact(
                'mes',
                'ano',
                'setores',
                'setor'
            )
        );
    }

    public function registros(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $setor = $request->setor ?? 1;

        $metaVendasComp = null;
        $metasVendasAnualComp = null;

        $metaVendas = (new VendasService())->metaVendas($mes, $ano, $setor);
        $metasVendasAnual = (new VendasService())->metaVendasAnual($ano, $setor);
        $vendasEstados = (new VendasService())->vendasPorEstados($mes, $ano, $setor);
        $metaAnualEmpresa = (new MetasVendas())->metasMensaisEmpresa($ano);

        if ($request->mesComp || $request->anoComp) {
            $mesComp = $request->mesComp ?? date('n');
            $anoComp = $request->anoComp ?? date('Y');

            $metaVendasComp = (new VendasService())->metaVendas($mesComp, $anoComp, $setor);
            $metasVendasAnualComp = (new VendasService())->metaVendasAnual($mesComp, $setor);
        }

        return response()->json([
            'vedas_metas' => $metaVendas,
            'vedas_metas_anual' => $metasVendasAnual,
            'vedas_metas_comp' => $metaVendasComp,
            'vedas_metas_anual_comp' => $metasVendasAnualComp,
            'vendas_estados' => $vendasEstados,
            'meta_anual_empresa' => $metaAnualEmpresa
        ]);
    }
}
