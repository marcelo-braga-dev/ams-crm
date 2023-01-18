<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
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
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($chamado['id_pedido']);

        return Inertia::render('Consultor/Chamados/Responder/Show', compact('chamado', 'mensagens'));
    }

    public function update(Request $request)
    {
        if ($request->finalizar) (new FinalizadosChamadoStatus())->updateStatus($request->id);
        else (new RespondidoChamadoStatus())->responder($request->id, $request->mensagem);

        return redirect()->route('consultor.chamados.index');
    }
}
