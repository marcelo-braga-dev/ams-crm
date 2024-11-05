<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\Setores;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    public function index(Request $request)
    {
        $setores = (new SetoresService())->setores();
        $categorias = (new ProdutosCategorias())->categorias(null, true);

        return Inertia::render('Admin/Produtos/Categorias/Index',
            compact('categorias', 'setores'));
    }

    public function show($id)
    {

        $categoria = (new ProdutosCategorias())->find($id);

        return Inertia::render('Admin/Produtos/Categorias/Show',
            compact('categoria',));
    }

    public function create(Request $request)
    {
        $fornecedor = (new Fornecedores())->find($request->fornecedor);

        return Inertia::render('Admin/Produtos/Categorias/Create',
            compact('fornecedor'));
    }

    public function store(Request $request)
    {
        (new ProdutosCategorias())->create($request->nome, $request->setor);

        modalSucesso('Categoria cadastrada com sucesso!');
        return redirect()->back();
    }

    public function edit($id)
    {
        $setores = (new Setores())->setores();
        $categoria = (new ProdutosCategorias())->find($id);

        return Inertia::render('Admin/Produtos/Categorias/Create',
            compact('categoria', 'setores'));
    }

    public function destroy($id)
    {
        (new ProdutosCategorias())->excluir($id);

        modalSucesso('Categoria excluída com sucesso!');
        return redirect()->route('admin.produtos-categorias.index');
    }
}
