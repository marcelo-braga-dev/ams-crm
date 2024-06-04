<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Models\ProdutosDados;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index()
    {
        $produtos = (new Produtos())->produtos();

        return Inertia::render('Admin/Produtos/Index', compact('produtos'));
    }

    public function show($id)
    {
        $produto = (new Produtos())->produto($id);
        $infos = (new ProdutosDados())->get($id);
//        print_pre($produto);
        return Inertia::render('Admin/Produtos/Show',
            compact('produto', 'infos'));
    }
}
