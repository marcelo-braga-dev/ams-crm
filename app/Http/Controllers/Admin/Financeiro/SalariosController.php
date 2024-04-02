<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosSalarios;
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
        $ano = $request->ano ?? date('Y');
        $userId = $id;
        $dados = (new FinanceirosSalarios())->salarios($id, $ano);

        return Inertia::render('Admin/Financeiro/Salarios/Edit',
            compact('dados', 'userId', 'ano'));
    }

    public function store(Request $request)
    {
//        print_pre($request->all())

        (new FinanceirosSalarios())->atualizar($request);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }

    public function salariosMensais(Request $request)
    {
        $dados = (new FinanceirosSalarios())->salarios($request->mes, $request->ano);

        return response()->json($dados);
    }
}
