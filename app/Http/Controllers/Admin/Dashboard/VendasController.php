<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
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

//        $vendasLeads = (new VendasService())->vendasPorLeads([$mes], $ano, $setor);
//        print_pre($vendasLeads);

        return Inertia::render('Admin/Dashboard/Vendas/Index',
            compact('mes', 'ano', 'setores', 'setor')
        );
    }

    public function registros(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $setor = $request->setor ?? 1;

        $vendas = (new Pedidos())->vendasPeriodo($mes, $ano, $setor);
        $vendasTotal = (new Pedidos())->vendasMensalEmpresa($mes, $ano, $setor);
        $vendasAnual = (new Pedidos())->vendasAnualEmpresa($ano, $setor);

        $metasUsuarios = (new MetasVendas())->metasMensalUsuarios($mes, $ano);

        //
        $metasVendasAnualComp = null;

        $metaVendas = (new VendasService())->metaVendas($mes, $ano, $setor);
        $metasVendasAnual = (new VendasService())->metaVendasAnual($ano, $setor);
        $metaAnualEmpresa = (new MetasVendas())->metasMensaisEmpresa($ano, $setor);

        $vendasEstados = (new VendasService())->vendasPorEstados($mes, $ano, $setor);
        $vendasLeads = (new VendasService())->vendasPorLeads($mes, $ano, $setor);

        if ($request->mesComp || $request->anoComp) {
            $mesComp = $request->mesComp ?? date('n');
            $anoComp = $request->anoComp ?? date('Y');

            $vendasComp = (new Pedidos())->vendasPeriodo($mesComp, $anoComp, $setor, true);
            $metasUsuariosComp = (new MetasVendas())->metasMensalUsuarios($mesComp, $anoComp);
            //
            $metasVendasAnualComp = (new VendasService())->metaVendasAnual($mesComp, $setor);
        }

        return response()->json([
            'vendas' => ['usuarios' => $vendas, 'total' => $vendasTotal],
            'vendas_anual' => $vendasAnual,
            'metas_usuarios' => $metasUsuarios,

            'vedas_comp' => ['usuarios' => $vendasComp ?? [], 'total' => $vendasTotal],
            'metas_usuarios_comp' => $metasUsuariosComp ?? [],
            'vendas_leads' => $vendasLeads,

            //
            'vedas_metas' => $metaVendas,
            'vedas_metas_anual' => $metasVendasAnual,
            'vedas_metas_anual_comp' => $metasVendasAnualComp,
            'vendas_estados' => $vendasEstados,
            'meta_anual_empresa' => $metaAnualEmpresa
        ]);
    }
}
