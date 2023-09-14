<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        $produtos = (new Produtos())->getProdutos($request->fornecedor);
        $fornecedor = (new Fornecedores())->getFornecedor($request->fornecedor);

        return Inertia::render('Admin/Produtos/Index', compact('produtos', 'fornecedor'));
    }

    public function create(Request $request)
    {
        $fornecedor = (new Fornecedores())->getFornecedor($request->fornecedor);

        return Inertia::render('Admin/Produtos/Create', compact('fornecedor'));
    }

    public function store(Request $request)
    {
        (new Produtos())->create($request);

        return redirect()->route('admin.produtos.index', ['fornecedor' => $request->fornecedor]);
    }

    public function edit($id)
    {
        $produto = (new Produtos())->find($id);
        $fornecedor = (new Fornecedores())->getFornecedor($produto['fornecedores_id']);

        return Inertia::render('Admin/Produtos/Edit',
            compact('produto', 'fornecedor'));
    }

    public function update($id, Request $request)
    {
        (new Produtos())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.produtos.index', ['fornecedor' => $request->fornecedor]);
    }
}
