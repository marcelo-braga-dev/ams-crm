<?php

namespace App\Http\Controllers\Admin\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Sac;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbertoController extends Controller
{
    public function show($id, Request $request)
    {
        $sac = (new Sac())->msgsAnexos($id);
        $pedido = (new Pedidos())->getDadosPedido($sac->pedido_id);

        return Inertia::render('Admin/Chamados/Aberto/Index', compact('sac', 'pedido'));
    }

    public function avancarStatus(Request $request)
    {
        (new Sac())->avancarStatus($request->id, 'atendimento');

        modalSucesso('Sac iniciado atendiemnto!');
        return redirect()->route('admin.chamado.atendimento.show', $request->id);
    }
}
