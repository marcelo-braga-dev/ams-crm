<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosSalarios;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Financeiro\Salarios\SalariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SalariosController extends Controller
{
    public function index(Request $request)
    {
        $setor = $request->setor;
        $usuarios = (new User())->getUsuarios($setor);
        $setores = (new Setores())->get();

        return Inertia::render('Admin/Financeiro/Salarios/Index',
            compact('usuarios', 'setores', 'setor'));
    }

    public function edit($id, Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $usuario = (new User())->get($id);

        return Inertia::render('Admin/Financeiro/Salarios/Edit',
            compact('usuario', 'mes', 'ano'));
    }

    public function store(Request $request)
    {
//        print_pre($request->all());
        (new FinanceirosSalarios())->atualizar($request);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }

    public function registros(Request $request)
    {
        $mes = $request->competencia ?? date('n');
        $ano = $request->ano ?? date('Y');

        $registros = (new FinanceirosSalarios())->salariosMes($request->id, $mes, $ano);
        $vendasMensalUsuario = (new Pedidos())->getVendasMesUsuario($request->id, $mes, $ano);
        $metaMes = (new MetasVendas())->getMetaMes($request->id, $mes, $ano);

        [$vendasEquipe, $metasEquipe] = (new SalariosService())->equipe($request->id, $mes, $ano);

        $metasAnual = (new MetasVendas())->metasMensais($request->id, $ano);
        $vendasAnualUsuario = (new Pedidos())->vendasMensaisUsuario($request->id, $ano);
        $vendasMensais = (new Pedidos())->vendasMensaisUsuario($request->id, $ano);

        return ['registros' => $registros, 'vendas_mensais' => $vendasMensais, 'metas_mensais' => $metasAnual,
            'vendas_mes' => $vendasMensalUsuario, 'meta_mes' => $metaMes, 'metas_anual' => $metasAnual,
            'vendas_anual' => $vendasAnualUsuario, 'vendas_equipe' => $vendasEquipe, 'metas_equipe' => $metasEquipe];
    }
}
