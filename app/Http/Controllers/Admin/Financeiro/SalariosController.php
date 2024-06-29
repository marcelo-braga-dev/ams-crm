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
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $userId = $request->user_id;
        $setor = $request->setor;

        $usuario = $userId ? (new User())->get($userId) : [];
        $usuarios = (new User())->getUsuarios($setor);

        return Inertia::render('Admin/Financeiro/Salarios/Index',
            compact('usuario', 'usuarios', 'mes', 'ano'));
    }

    public function store(Request $request)
    {
        (new FinanceirosSalarios())->atualizar($request);
    }

    public function registros(Request $request)
    {
        $mes = $request->competencia ?? date('n');
        $ano = $request->ano ?? date('Y');
        $userId = $request->user_id;

        $usuario = (new User())->get($userId);
        $registros = (new FinanceirosSalarios())->salariosMes($userId, $mes, $ano);
        $vendasMensalUsuario = (new Pedidos())->getVendasMesUsuario($userId, $mes, $ano);
        $metaMes = (new MetasVendas())->getMetaMes($userId, $mes, $ano);

        [$vendasEquipe, $metasEquipe] = (new SalariosService())->equipe($userId, $mes, $ano);

        $metasAnual = (new MetasVendas())->metasMensais($userId, $ano);
        $vendasAnualUsuario = (new Pedidos())->vendasMensaisUsuario($userId, $ano);
        $vendasMensais = (new Pedidos())->vendasMensaisUsuario($userId, $ano);

        return ['registros' => $registros, 'vendas_mensais' => $vendasMensais, 'metas_mensais' => $metasAnual, 'usuario' => $usuario,
            'vendas_mes' => $vendasMensalUsuario, 'meta_mes' => $metaMes, 'metas_anual' => $metasAnual,
            'vendas_anual' => $vendasAnualUsuario, 'vendas_equipe' => $vendasEquipe, 'metas_equipe' => $metasEquipe];
    }
}
