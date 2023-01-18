<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Services\Pedidos\CardDadosService;
use App\Services\Pedidos\PedidosServices;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index()
    {
        $pedidos = (new CardDadosService())->getCards();

        return Inertia::render('Supervisor/Pedidos/Index', compact('pedidos'));
    }

    public function show($id)
    {
        $pedido = (new Pedidos())->getV2($id);
        $historico = (new PedidosHistoricos())->historico($id);

        return Inertia::render('Supervisor/Pedidos/Show',
            compact('pedido', 'historico'));
    }

    public function historico()
    {
        $pedidos = (new PedidosServices())->pedidos();

        return Inertia::render('Supervisor/Pedidos/Historico', compact('pedidos'));
    }

    public function destroy($id)
    {
        (new Pedidos())->remove($id);

        return redirect()->back();
    }
}
