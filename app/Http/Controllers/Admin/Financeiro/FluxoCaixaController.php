<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FluxoCaixa;
use App\Models\FluxoCaixasConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FluxoCaixaController extends Controller
{
    public function index()
    {
        $dados = (new FluxoCaixa())->getValores();

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Index', compact('dados'));
    }

    public function create()
    {
        $dados = [
            'empresas' => (new FluxoCaixasConfig())->getEmpresas(),
            'fornecedores' => (new FluxoCaixasConfig())->getFornecedores(),
            'bancos' => (new FluxoCaixasConfig())->getBancos(),
        ];

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Create', compact('dados'));
    }

    public function store(Request $request)
    {
        (new FluxoCaixa())->create($request);

        modalSucesso('Operação realizada com sucesso@');
        return redirect()->route('admin.financeiro.fluxo-caixa.index');
    }

    public function show($id)
    {
        $dados = (new FluxoCaixa())->find($id);
        $bancos = (new FluxoCaixasConfig())->getBancos();

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Show',
            compact('dados', 'bancos'));
    }

    public function update($id, Request $request)
    {
        (new FluxoCaixa())->atualizarBaixa($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
    }

    public function alterarStatus(Request $request)
    {
        (new FluxoCaixa())->updateStatus($request->id, $request->status);

        modalSucesso("Status atualizado com sucesso!");
    }
}
