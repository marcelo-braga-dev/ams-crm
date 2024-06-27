<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\ProdutosFornecedores;
use App\Models\Setores;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FornecedoresController extends Controller
{
    public function index(Request $request)
    {
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores();

        return Inertia::render(
            'Admin/Produtos/Fornecedores/Index',
            compact('fornecedores', 'setores')
        );
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Produtos/Fornecedores/Create', compact('setores'));
    }

    public function store(Request $request)
    {
        (new ProdutosFornecedores())->create($request);

        modalSucesso('Fornecedor cadastrado com sucesso!');
        return redirect()->route('admin.produtos.fornecedores.index');
    }

    public function show($id)
    {
        $fornecedor = (new ProdutosFornecedores())->find($id);

        return Inertia::render('Admin/Produtos/Fornecedores/Show', compact('fornecedor'));
    }

    public function edit($id)
    {
        $setores = (new Setores())->setores();
        $fornecedor = (new ProdutosFornecedores())->find($id);

        return Inertia::render('Admin/Produtos/Fornecedores/Edit', compact('fornecedor', 'setores'));
    }

    public function update($id, Request $request)
    {
        (new ProdutosFornecedores())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.produtos.fornecedores.index');
    }
}
