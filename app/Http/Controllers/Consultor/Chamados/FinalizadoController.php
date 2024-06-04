<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Sac;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinalizadoController extends Controller
{
    public function show($id, Request $request)
    {
        $sac = (new Sac())->msgsAnexos($id);
        $pedido = (new Pedidos())->getDadosPedido($sac->pedido_id);

        return Inertia::render('Consultor/Chamados/Finalizado/Index', compact('sac', 'pedido'));
    }

    public function update($id)
    {
        (new Sac())->avancarStatus($id, 'atendimento');

        modalSucesso('Sac iniciado atendiemnto!');
        return redirect()->route('', $id);
    }

    public function avancarStatus(Request $request)
    {
        (new Sac())->avancarStatus($request->id, 'atendimento');

        return redirect()->back();
    }
}
