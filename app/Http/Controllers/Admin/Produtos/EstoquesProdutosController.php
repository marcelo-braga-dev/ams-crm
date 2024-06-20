<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * @deprecated
 */
class EstoquesProdutosController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        return Inertia::render('Admin/Produtos/EstoqueLocal/Index',
            compact('fornecedores', 'setores', 'setorAtual'));
    }

    public function show($id)
    {
        $produtos = (new Produtos())->getProdutos($id);
        $fornecedor = (new Fornecedores())->find($id);

        return Inertia::render('Admin/Produtos/EstoqueLocal/Show',
            compact('produtos', 'fornecedor'));
    }

    public function update($id, Request $request)
    {
        (new Produtos())->atualizarEstoqueLocal($id, $request->valor);

        modalSucesso('Estoque atualizado com sucesso!');
        return redirect()->back();
    }
}
