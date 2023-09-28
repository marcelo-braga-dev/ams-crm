<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosFornecedoresController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        return Inertia::render('Admin/Produtos/Fornecedores/Index',
            compact('fornecedores', 'setores', 'setorAtual'));
    }

    public function show($id)
    {
        $produtos = (new Produtos())->getProdutos($id);
        $fornecedor = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Admin/Produtos/Fornecedores/Show',
            compact('produtos', 'fornecedor'));
    }

    public function create(Request $request)
    {
        $fornecedor = (new Fornecedores())->getFornecedor($request->fornecedor);

        return Inertia::render('Admin/Produtos/Fornecedores/Create', compact('fornecedor'));
    }

    public function edit($id)
    {
        $produto = (new Produtos())->find($id);
        $fornecedor = (new Fornecedores())->getFornecedor($produto['fornecedores_id']);

        return Inertia::render('Admin/Produtos/Fornecedores/Edit',
            compact('produto', 'fornecedor'));
    }

    public function update($id, Request $request)
    {
        (new Produtos())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.produtos-fornecedores.show', $request->fornecedor);
    }

    public function store(Request $request)
    {
        (new Produtos())->create($request);

        return redirect()->route('admin.produtos-fornecedores.show', $request->fornecedor);
    }

    public function destroy($id)
    {
        (new Produtos())->excluir($id);

        modalSucesso('Produto deletado com sucesso!');
        return redirect()->back();
    }
}
