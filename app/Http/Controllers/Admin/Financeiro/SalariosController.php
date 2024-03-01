<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosSalarios;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SalariosController extends Controller
{
    public function index()
    {
        $mes = intval(date('m'));
        $ano = date('Y');

        return Inertia::render('Admin/Financeiro/Salarios/Index',
            compact('mes', 'ano'));
    }

    public function store(Request $request)
    {
        (new FinanceirosSalarios())->atualizar($request);
    }

    public function salariosMensais(Request $request)
    {
        $dados = (new FinanceirosSalarios())->salarios($request->mes, $request->ano);

        return response()->json($dados);
    }
}
