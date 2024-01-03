<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosInformacoes;
use App\Models\ProdutosUnidades;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use App\src\Produtos\InformacoesProdutos;
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
        $fornecedor = (new Fornecedores())->find($id);

        return Inertia::render('Admin/Produtos/Fornecedores/Show',
            compact('produtos', 'fornecedor'));
    }

    public function create(Request $request)
    {
        $fornecedor = (new Fornecedores())->find($request->fornecedor);
        $categorias = (new ProdutosCategorias())->categorias($fornecedor['setor_id']);
        $unidades = (new ProdutosUnidades())->get();

        return Inertia::render('Admin/Produtos/Create',
            compact('fornecedor', 'categorias', 'unidades'));
    }

    public function edit($id)
    {
        $produto = (new Produtos())->find($id);
        $fornecedor = (new Fornecedores())->find($produto['fornecedores_id']);
        $categorias = (new ProdutosCategorias())->categorias();
        $unidades = (new ProdutosUnidades())->get();
        $infos = (new ProdutosInformacoes())->get($id);

        return Inertia::render('Admin/Produtos/Edit',
            compact('produto', 'fornecedor', 'categorias', 'unidades', 'infos'));
    }

    public function update($id, Request $request)
    {
        (new Produtos())->atualizar($id, $request);

        $keys = (new InformacoesProdutos());
        $keys->setUtilidade($id, $request->utilidade);
        $keys->setModoUsar($id, $request->modo_usar);
        $keys->setVantagens($id, $request->vantagens);
        $keys->setDuvidas($id, $request->duvidas);
        $keys->setGaleria($id, $request->galeria);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.produtos-fornecedores.show', $request->fornecedor);
    }

    public function store(Request $request)
    {
        $id = (new Produtos())->create($request);

        $keys = (new InformacoesProdutos());
        $keys->setUtilidade($id, $request->utilidade);
        $keys->setModoUsar($id, $request->modo_usar);
        $keys->setVantagens($id, $request->vantagens);
        $keys->setDuvidas($id, $request->duvidas);
        $keys->setGaleria($id, $request->galeria);

        modalSucesso('Produto Cadastrado com Sucesso!');
        return redirect()->route('admin.produtos-fornecedores.show', $request->fornecedor);
    }

    public function destroy($id)
    {
        (new Produtos())->excluir($id);

        modalSucesso('Produto deletado com sucesso!');
        return redirect()->back();
    }
}
