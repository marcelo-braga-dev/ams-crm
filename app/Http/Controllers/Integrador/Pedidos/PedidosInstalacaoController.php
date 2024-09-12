<?php

namespace App\Http\Controllers\Integrador\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos\Instalacoes\PedidosInstalacoes;
use App\Models\Pedidos\Instalacoes\PedidosInstalacoesAnotacoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosInstalacaoController extends Controller
{
    public function show($id)
    {
        $anotacoes = (new PedidosInstalacoes())->getAnotacoes($id);

        return Inertia::render('Integrador/Pedidos/Instalacao/Show', compact('anotacoes'));
    }

    public function store(Request $request)
    {
        (new PedidosInstalacoesAnotacoes())->cadastrar($request);

        modalSucesso('Anotação realizada com sucesso!');
        return redirect()->back();
    }
}
