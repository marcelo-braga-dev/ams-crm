<?php

namespace App\Http\Controllers\Consultor\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Produtos;
use App\Services\Fornecedores\FornecedoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * @deprecated
 */
class ProdutosFornecedorController extends Controller
{
    public function index(Request $request)
    {
        $fornecedores = (new FornecedoresService())->fornecedores(setor_usuario_atual());

        return Inertia::render('Consultor/Produtos/Fornecedores/Index',
            compact('fornecedores'));
    }

    public function show($id)
    {
        $produtos = (new Produtos())->getProdutos($id);
        $fornecedor = (new Fornecedores())->find($id);

        return Inertia::render('Consultor/Produtos/Fornecedores/Show',
        compact('produtos', 'fornecedor'));
    }
}
