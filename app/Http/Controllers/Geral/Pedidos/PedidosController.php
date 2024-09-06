<?php

namespace App\Http\Controllers\Geral\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos\PedidosAnotacoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function create(Request $request)
    {
        $leadId = $request->input('lead_id');

        return Inertia::render('Geral/Pedidos/Create');
    }

    public function addAnotacoes(Request $request)
    {
        (new PedidosAnotacoes())->create($request->pedido_id, $request->mensagem);

        modalSucesso('Anotação cadastrada com sucesso.');
        return redirect()->back();
    }
}
