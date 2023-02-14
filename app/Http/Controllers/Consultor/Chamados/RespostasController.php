<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;
use App\src\Chamados\Status\FinalizadosChamadoStatus;
use App\src\Chamados\Status\RespondidoChamadoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RespostasController extends Controller
{
    public function show($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $pedido = (new Pedidos())->getDadosPedido($chamado['id_pedido']);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($id);

        return Inertia::render('Consultor/Chamados/Responder/Show',
            compact('chamado', 'pedido', 'mensagens'));
    }

    public function update(Request $request)
    {

        return redirect()->route('consultor.chamados.index');
    }
}
