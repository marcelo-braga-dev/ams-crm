<?php

namespace App\Http\Controllers\Supervisor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\PedidosChamados;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamadosPedidoController extends Controller
{
    public function show($id)
    {
        $chamados = (new PedidosChamados())->getChamadosPedido($id);

        return Inertia::render('Supervisor/Chamados/Pedidos/Show', compact('chamados'));
    }
}
