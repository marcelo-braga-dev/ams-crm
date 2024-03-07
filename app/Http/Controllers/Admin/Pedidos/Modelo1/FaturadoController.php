<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturadoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);

        if ($pedido['pedido']['modelo'] == 1)
            return Inertia::render('Admin/Pedidos/Faturado/Show',
                compact('pedido'));

        return Inertia::render('Admin/Pedidos/Modelo2/Faturado/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->faturado($id, $request->msg);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
