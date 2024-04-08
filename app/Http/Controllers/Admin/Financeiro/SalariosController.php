<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosSalarios;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
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
        $userId = $id;
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
//        print_pre((new Pedidos())->vendasMensaisUsuario(25, $ano));

        $usuario = (new User())->get($userId);
        $dados = (new FinanceirosSalarios())->salariosMes($id, $mes, $ano);

        return Inertia::render('Admin/Financeiro/Salarios/Edit',
            compact('dados', 'usuario', 'mes', 'ano', 'userId'));
    }

    public function store(Request $request)
    {
        (new FinanceirosSalarios())->atualizar($request);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }

    public function registros(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $registros = (new FinanceirosSalarios())->salariosMes($request->id, $mes, $ano);
        $vendasMensalUsuario = (new Pedidos())->getVendasMesUsuario($request->id, $mes, $ano);
        $metaMes = (new MetasVendas())->getMetaMes($request->id, $mes, $ano);
        $metasAnual = (new MetasVendas())->getMetasUsuario($request->id, $ano);
        $vendasAnualUsuario = (new Pedidos())->vendasMensaisUsuario($request->id, $ano);

        return ['registros' => $registros, 'vendas_mes' => $vendasMensalUsuario, 'meta_mes' => $metaMes, 'metas_anual' => $metasAnual,
            'vendas_anual' => $vendasAnualUsuario];
    }
}
