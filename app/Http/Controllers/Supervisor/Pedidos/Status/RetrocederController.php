<?php

namespace App\Http\Controllers\Supervisor\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Services\Pedidos\RetrocederStatusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RetrocederController extends Controller
{
    public function edit($id)
    {
        $dados = (new Pedidos())->getDadosPedido($id);

        return Inertia::render('Supervisor/Pedidos/Retroceder/Edit', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new RetrocederStatusService())->retroceder($id, $request->get('motivo'));

        modalSucesso("Pedido Regredito Status com Sucesso!");
        return redirect()->route('admin.pedidos.index');
    }
}
