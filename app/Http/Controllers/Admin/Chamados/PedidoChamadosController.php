<?php

namespace App\Http\Controllers\Admin\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosChamados;
use App\Models\Sac;
use App\Services\Chamados\ChamadoDadosCardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoChamadosController extends Controller
{
    public function show($id)
    {
        $sacs = (new Sac())->pedido($id);
        $pedido = (new Pedidos())->getDadosPedido($id);

        return Inertia::render('Admin/Chamados/Pedido/Show',
            compact('sacs', 'pedido'));
    }
}
