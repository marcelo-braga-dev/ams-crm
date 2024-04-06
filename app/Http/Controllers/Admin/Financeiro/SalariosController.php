<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosSalarios;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SalariosController extends Controller
{
    public function index()
    {
        $usuarios = (new User())->getUsuarios(true);

        return Inertia::render('Admin/Financeiro/Salarios/Index',
            compact('usuarios'));
    }

    public function edit($id, Request $request)
    {
        $userId = $id;
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $usuario = (new User())->get($userId);
        $dados = (new FinanceirosSalarios())->salariosMes($id, $mes, $ano);

//        $metaMes = (new MetasVendas())->getMetaMes($userId, $mes, $ano);
//        print_pre($metaMes);

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

        return ['registros' => $registros, 'vendas_mes' => $vendasMensalUsuario, 'meta_mes' => $metaMes];
    }
}
