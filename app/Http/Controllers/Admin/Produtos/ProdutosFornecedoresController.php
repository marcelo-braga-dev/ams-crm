<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosDados;
use App\Models\ProdutosUnidades;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use App\src\Produtos\InformacoesProdutos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class  ProdutosFornecedoresController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        return Inertia::render(
            'Admin/Produtos/Fornecedores/Index',
            compact('fornecedores', 'setores', 'setorAtual')
        );
    }

    public function show($id)
    {
        $produtos = (new Produtos())->getProdutos($id);
        $fornecedor = (new Fornecedores())->find($id);

        return Inertia::render(
            'Admin/Produtos/Fornecedores/Show',
            compact('produtos', 'fornecedor')
        );
    }

    public function destroy($id)
    {
        (new Produtos())->excluir($id);

        modalSucesso('Produto deletado com sucesso!');
        return redirect()->back();
    }
}
