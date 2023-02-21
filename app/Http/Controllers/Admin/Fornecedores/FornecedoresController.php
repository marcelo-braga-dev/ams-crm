<?php

namespace App\Http\Controllers\Admin\Fornecedores;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Setores;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FornecedoresController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        return Inertia::render('Admin/Fornecedores/Index',
            compact('fornecedores', 'setores', 'setorAtual'));
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Fornecedores/Create',
            compact('setores'));
    }

    public function show($id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Admin/Fornecedores/Show', compact('dados'));
    }

    public function edit(int $id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Fornecedores/Edit',
            compact('dados', 'setores'));
    }

    public function store(Request $request)
    {
        (new Fornecedores())->create($request);

        modalSucesso("Fornecedor cadastrado com sucesso!");
        return redirect()->route('admin.fornecedores.index');
    }

    public function update($id, Request $request)
    {
        (new Fornecedores())->atualizar($id, $request);

        return redirect()->route('admin.fornecedores.index');
    }
}
