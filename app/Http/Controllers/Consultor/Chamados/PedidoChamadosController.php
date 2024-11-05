<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Sac;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoChamadosController extends Controller
{
   public function show($id)
   {
       $sacs = (new Sac())->pedido($id);
       $pedido = (new Pedidos())->getDadosPedido($id);

        return Inertia::render('Consultor/Chamados/Pedido/Show',
            compact('sacs', 'pedido'));
   }
}
