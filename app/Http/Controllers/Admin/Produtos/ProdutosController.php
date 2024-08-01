<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosDados;
use App\Models\ProdutosEstoquesHistoricos;
use App\Models\ProdutosFornecedores;
use App\Models\ProdutosUnidades;
use App\Models\Setores;
use App\src\Produtos\InformacoesProdutos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        $categorias = (new ProdutosCategorias())->categorias();
        $fornecedores = (new ProdutosFornecedores())->get();
        $isFinanceiro = is_financeiro();

        return Inertia::render('Admin/Produtos/Index/Index',
            compact('categorias', 'fornecedores', 'isFinanceiro'));
    }

    public function produtos(Request $request)
    {
        $produtos = (new Produtos())->produtos($request->filtros);

        return response()->json($produtos);
    }

    public function show($id)
    {
        $produto = (new Produtos())->produto($id);
        $infos = (new ProdutosDados())->get($id);
        $estoqueHistorico = (new ProdutosEstoquesHistoricos())->gets($id);

        return Inertia::render('Admin/Produtos/Show',
            compact('produto', 'infos', 'estoqueHistorico'));
    }

    public function create()
    {
        $fornecedores = (new ProdutosFornecedores())->get();
        $setores = (new Setores())->get();
        $categorias = (new ProdutosCategorias())->categorias();
        $unidades = (new ProdutosUnidades())->get();

        return Inertia::render(
            'Admin/Produtos/Create',
            compact('fornecedores', 'setores', 'categorias', 'unidades')
        );
    }

    public function store(Request $request)
    {
        $id = (new Produtos())->create($request);

        $keys = (new InformacoesProdutos());
        $keys->setDescricao($id, $request->descricao);
        $keys->setUtilidade($id, $request->utilidade);
        $keys->setModoUsar($id, $request->modo_usar);
        $keys->setVantagens($id, $request->vantagens);
        $keys->setDuvidas($id, $request->duvidas);
        $keys->setGaleria($id, $request->galeria);

        modalSucesso('Produto Cadastrado com Sucesso!');
        return redirect()->route('admin.produtos.show', $id);
    }

    public function edit($id)
    {
        $produto = (new Produtos())->find($id);
        $categorias = (new ProdutosCategorias())->categorias();
        $unidades = (new ProdutosUnidades())->get();
        $infos = (new ProdutosDados())->get($id);

        $fornecedores = (new ProdutosFornecedores())->get();
        $setores = (new Setores())->get();

        return Inertia::render(
            'Admin/Produtos/Edit',
            compact('produto', 'categorias', 'unidades', 'infos', 'setores', 'fornecedores')
        );
    }

    public function update($id, Request $request)
    {
        (new Produtos())->atualizar($id, $request);

        $keys = (new InformacoesProdutos());
        $keys->setDescricao($id, $request->descricao);
        $keys->setUtilidade($id, $request->utilidade);
        $keys->setModoUsar($id, $request->modo_usar);
        $keys->setVantagens($id, $request->vantagens);
        $keys->setDuvidas($id, $request->duvidas);
        $keys->setGaleria($id, $request->galeria);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.produtos.show', $id);
    }

    public function updateStatus(Request $request)
    {
        modalSucesso('Status Atualizado com sucesso!');
        (new Produtos())->updateStatus($request->id, $request->status);
    }

    public function updateEstoque(Request $request)
    {
        (new ProdutosEstoquesHistoricos())->createEntrada($request);
        (new Produtos())->updateEstoque($request->produto_id, $request->qtd);

        modalSucesso('Estoque Atualizado com sucesso!');
    }

    public function deletarGaleria(Request $request)
    {
        (new ProdutosDados())->deletarGaleria($request->valor);
        modalSucesso('informação deletada com sucesso!');
    }
}
