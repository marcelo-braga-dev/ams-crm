<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Models\ProdutosTransito;
use App\Models\User;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstoqueTransitoController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $usuarios = (new User())->getConsultores($setorAtual);

        return Inertia::render('Admin/Produtos/EstoqueTransito/Index',
            compact('usuarios', 'setores', 'setorAtual'));
    }

    public function fornecedores($id, Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        return Inertia::render('Admin/Produtos/EstoqueTransito/Fornecedores',
            compact('id', 'fornecedores', 'setores', 'setorAtual'));
    }

    public function show($id, Request $request)
    {
        $idFornecedor = $request->fornecedor;
        $fornecedor = (new Fornecedores())->getFornecedor($idFornecedor);

        $produtos = (new ProdutosTransito())->consultor($id, $idFornecedor);

        return Inertia::render('Admin/Produtos/EstoqueTransito/Show',
            compact('id', 'produtos', 'fornecedor', 'idFornecedor'));
    }

    public function update($id, Request $request)
    {
        (new ProdutosTransito())->atualizar($id, $request);

        modalSucesso('Informação atualizada com sucesso!');
        return redirect()->back();
    }
}
