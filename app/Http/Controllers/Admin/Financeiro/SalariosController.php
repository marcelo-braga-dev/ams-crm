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
        $userId = $id;
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $usuario = (new User())->get($userId);
        $dados = (new FinanceirosSalarios())->salarios($id, $mes, $ano);

        return Inertia::render('Admin/Financeiro/Salarios/Edit',
            compact('dados', 'usuario', 'userId', 'mes', 'ano'));
    }

    public function store(Request $request)
    {
        (new FinanceirosSalarios())->atualizar($request);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }
}
