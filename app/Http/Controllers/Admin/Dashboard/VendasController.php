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

        return Inertia::render('Admin/Dashboard/Vendas/Index',
            compact('mes', 'ano', 'setores', 'setor')
        );
    }

    public function registros(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $mesComp = $request->mesComp ?? [];
        $anoComp = $request->anoComp ?? null;
        $setor = $request->setor ?? 1;
        $usuario = $request->user_id;
        $usuario = 25;

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
        $vendasLeads = (new VendasService())->vendasPorLeads($mes, $ano, $setor, 10, true);
        $leads = (new VendasService())->vendasPorLeadsIds($mes, $ano, $mesComp, $anoComp, $setor, 10);
        $fornecedoresVendas = (new VendasService())->vendasFornecedores($mes, $ano, $setor, null, false);


        if ($request->mesComp || $request->anoComp) {
            $vendasComp = (new Pedidos())->vendasPeriodo($mesComp, $anoComp, $setor, true);
            $vendasLeadsComp = (new VendasService())->vendasPorLeads($mesComp, $anoComp, $setor, 10, true);

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
            'vendas_leads_comp' => $vendasLeadsComp ?? [],
            'leads' => $leads,
            'fornecedores_vendas' => $fornecedoresVendas,

            //
            'vedas_metas' => $metaVendas,
            'vedas_metas_anual' => $metasVendasAnual,
            'vedas_metas_anual_comp' => $metasVendasAnualComp,
            'vendas_estados' => $vendasEstados,
            'meta_anual_empresa' => $metaAnualEmpresa
        ]);
    }

    public function leadsVendas(Request $request)
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');
        $mesComp = $request->mesComp ?? [];
        $anoComp = $request->anoComp ?? null;
        $setor = $request->setor ?? 1;

        $setores = (new Setores())->get();

        $vendasLeads = (new VendasService())->vendasPorLeads($mes, $ano, $setor, null, true);
        $vendasLeadsComp = $mesComp && $anoComp ? (new VendasService())->vendasPorLeads($mesComp, $anoComp, $setor, null, true) : [];

        $leads = (new VendasService())->vendasPorLeadsIds($mes, $ano, $mesComp, $anoComp, $setor);

        return Inertia::render('Admin/Dashboard/Vendas/VendasLeads',
            compact('leads', 'vendasLeads', 'vendasLeadsComp', 'setores', 'mes', 'ano', 'mesComp', 'anoComp', 'setor'));
    }

    public function fornecedoresVendas(Request $request)
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');
        $mesComp = $request->mesComp ?? [];
        $anoComp = $request->anoComp ?? null;
        $setor = $request->setor ?? 1;

        $setores = (new Setores())->get();

        $fornecedoresVendas = (new VendasService())->vendasFornecedores($mes, $ano, $setor, null, false);
//print_pre( (new VendasService())->vendasFornecedor(11, [5], $ano, $setor, null, false));
        return Inertia::render('Admin/Dashboard/Vendas/VendasFornecedores',
            compact('fornecedoresVendas', 'setores', 'mes', 'ano', 'mesComp', 'anoComp', 'setor'));
    }

    public function getVendasFornecedor(Request $request)
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');
        $mesComp = $request->mesComp ?? [];
        $anoComp = $request->anoComp ?? null;
        $setor = $request->setor ?? 1;
        $fornecedor = $request->fornecedor;

        $vendas = (new VendasService())->vendasFornecedor($fornecedor, $mes, $ano, $setor, null, false);

        return response()->json($vendas);
    }

    public function getVendasFornecedorUsuario(Request $request)
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');
        $setor = $request->setor ?? 1;
        $usuario = $request->usuario;

        $vendas = (new VendasService())->vendasFornecedoresPorUsuario($mes, $ano, $usuario, $setor);

        return response()->json($vendas);
    }
}
