<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosUnidades;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnidadesController extends Controller
{
    public function index()
    {
        $unidades = (new ProdutosUnidades())->get();

        return Inertia::render('Admin/Produtos/Unidades/Index', compact('unidades'));
    }

    public function store(Request $request)
    {
        (new ProdutosUnidades())->create($request);
    }
}
