<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

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

        $pedido = (new Pedidos)->getV2($id);

        return Inertia::render('Supervisor/Pedidos/AguardandoFaturamento/Show',
            compact('pedido'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->faturando($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
