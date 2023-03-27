<?php

namespace App\Http\Controllers\Admin\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosAcompanhamentos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcompanhamentoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->getDadosPedido($id);
        $historicos = (new PedidosAcompanhamentos())->get($id);

        return Inertia::render('Admin/Pedidos/Acompanhamento/Show',
            compact('pedido', 'historicos'));
    }

    public function store(Request $request)
    {
        (new PedidosAcompanhamentos())->create($request->idPedido, $request->msg);

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }
}
