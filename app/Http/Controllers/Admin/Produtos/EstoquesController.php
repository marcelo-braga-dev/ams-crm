<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstoquesController extends Controller
{
    public function index(Request $request)
    {
        $produtos = (new Produtos())->produtos($request->fornecedor);

        return Inertia::render('Admin/Produtos/Estoques/Index', compact('produtos'));
    }
}
