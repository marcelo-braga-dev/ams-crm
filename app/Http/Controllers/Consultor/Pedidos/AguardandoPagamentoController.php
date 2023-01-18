<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosImagens;
use App\src\Pedidos\Pedido;
use App\src\Pedidos\PedidoUpdateStatus;
use App\src\Pedidos\SituacaoPedido;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AguardandoPagamentoController extends Controller
{
    public function show($id)
    {
        (new Pedidos())->updateSituacao($id, (new SituacaoPedido())->getAbertoTag());

        $dados = (new Pedidos())->getV2($id);

        return Inertia::render('Consultor/Pedidos/AguardandoPagamento/Show',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->pagamento($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('consultor.pedidos.index');
    }
}
