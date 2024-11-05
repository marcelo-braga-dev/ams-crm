<?php

namespace App\Http\Controllers\Geral\Sac;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Sac;
use App\Services\Chamados\CardsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SacController extends Controller
{
    public function index()
    {
        $sac = (new CardsService())->cards();

        return Inertia::render('Geral/Sac/Index', compact('sac'));
    }

    public function show($id)
    {
        $sac = (new Sac())->msgsAnexos($id);
        $pedido = (new Pedidos())->getDadosPedido($sac->pedido_id);

        return Inertia::render('Geral/Sac/Show', compact('sac', 'pedido'));
    }
}
