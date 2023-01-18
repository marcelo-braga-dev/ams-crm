<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Services\Pedidos\PedidosServices;
use App\src\Pedidos\Pedido;
use App\src\Pedidos\PedidoUpdateStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConferenciaController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getV2($id);

        return Inertia::render('Admin/Pedidos/Conferencia/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        if ($request->get('reprovado')) {
            (new PedidoUpdateStatus())->reprovado($id, $request->get('reprovado'));
        } else (new PedidoUpdateStatus())->conferencia($id);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
