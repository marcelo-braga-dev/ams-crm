<?php

namespace App\Http\Controllers\Supervisor\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosAcompanhamentos;
use App\Models\PedidosHistoricos;
use App\src\Pedidos\Status\AcompanhamentoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcompanhamentoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->getDadosPedido($id);
        $historicos = (new PedidosAcompanhamentos())->get($id);

        $infoEntrega = (new PedidosHistoricos())->getMsg($id, (new AcompanhamentoStatus()));

        return Inertia::render('Supervisor/Pedidos/Acompanhamento/Show',
            compact('pedido', 'historicos', 'infoEntrega'));
    }

    public function store(Request $request)
    {
        (new PedidosAcompanhamentos())->create($request->idPedido, $request->msg);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }
}
