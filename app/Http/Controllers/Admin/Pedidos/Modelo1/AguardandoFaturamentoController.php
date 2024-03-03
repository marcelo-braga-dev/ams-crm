<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use App\src\Pedidos\SituacaoPedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AguardandoFaturamentoController extends Controller
{
    public function show($id)
    {
        (new Pedidos())->updateSituacao($id, (new SituacaoPedido())->getAbertoTag());

        $pedido = (new Pedidos)->getDadosPedido($id);

        return Inertia::render('Admin/Pedidos/AguardandoFaturamento/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->setFaturado($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
