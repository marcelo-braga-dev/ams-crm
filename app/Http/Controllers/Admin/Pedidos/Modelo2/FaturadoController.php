<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo2;

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

        return Inertia::render('Admin/Pedidos/Modelo2/Faturado/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        try {
            (new PedidoUpdateStatus())->setEntregue($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
