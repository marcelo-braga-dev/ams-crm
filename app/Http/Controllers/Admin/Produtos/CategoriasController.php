<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        return Inertia::render('Admin/Produtos/Categorias/Index',
            compact('fornecedores', 'setores', 'setorAtual'));
    }

    public function show($id)
    {
        $fornecedor = (new Fornecedores())->getFornecedor($id);
        $categorias = (new ProdutosCategorias())->getFornecedor($id);

        return Inertia::render('Admin/Produtos/Categorias/Show',
            compact('categorias', 'fornecedor'));
    }

    public function create(Request $request)
    {
        $fornecedor = (new Fornecedores())->getFornecedor($request->fornecedor);

        return Inertia::render('Admin/Produtos/Categorias/Create',
            compact('fornecedor'));
    }

    public function store(Request $request)
    {
        (new ProdutosCategorias())->create($request->nome, $request->fornecedor);

        modalSucesso('Categoria cadastrada com sucesso!');
        return redirect()->back();
    }
}
