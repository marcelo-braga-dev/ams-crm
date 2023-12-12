<?php

namespace App\Http\Controllers\Consultor\Produtos;

use App\Http\Controllers\Controller;
use App\Models\Produtos;
use App\Models\ProdutosInformacoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function show($id)
    {
        $produto = (new Produtos())->find($id);
        $infos = (new ProdutosInformacoes())->get($id);

        return Inertia::render('Consultor/Produtos/Show',
            compact('produto', 'infos'));
    }
}
