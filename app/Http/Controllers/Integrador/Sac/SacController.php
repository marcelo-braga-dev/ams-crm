<?php

namespace App\Http\Controllers\Integrador\Sac;

use App\Models\Pedidos;
use App\Models\Sac;
use App\Services\Chamados\CardsService;
use Inertia\Inertia;

class SacController
{
    public function index()
    {
        $sac = (new CardsService())->cardsIntegrador();

        return Inertia::render('Integrador/Sac/Index', compact('sac'));
    }

    public function show($id)
    {
        $sac = (new Sac())->msgsAnexos($id);
        $pedido = (new Pedidos())->getDadosPedido($sac->pedido_id);

        return Inertia::render('Integrador/Sac/Show', compact('sac', 'pedido'));
    }
}
