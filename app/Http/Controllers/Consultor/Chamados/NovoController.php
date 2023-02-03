<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Chamados\Status\NovoChamadoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function create(Request $request)
    {
        $pedido = (new Pedidos())->getV2($request->id);

        return Inertia::render('Consultor/Chamados/Novo/Create', compact('pedido'));
    }

    public function store(Request $request)
    {
        (new NovoChamadoStatus())->create($request->id, $request->titulo, $request->mensagem);

        modalSucesso('Chamado criado com sucesso!');
        return redirect()->route('consultor.chamados.index');
    }
}
