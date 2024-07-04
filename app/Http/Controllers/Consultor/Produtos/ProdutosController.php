<?php

namespace App\Http\Controllers\Consultor\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Models\ProdutosDados;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index()
    {
        return Inertia::render('Consultor/Produtos/Index');
    }

    public function produtos(Request $request)
    {
        $produtos = (new Produtos())->produtos($request->filtros, setor_usuario_atual());

        return response()->json($produtos);
    }

    public function show($id)
    {
        $produto = (new Produtos())->find($id);
        $infos = (new ProdutosDados())->get($id);

        return Inertia::render('Consultor/Produtos/Show',
            compact('produto', 'infos'));
    }
}
