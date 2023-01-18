<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\Pedido;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use Inertia\Inertia;

class AguardandoPagamentoController extends Controller
{
    public function show($id)
    {
        $pedido = (new Pedidos)->newQuery()->findOrFail($id);
        $cliente = $pedido->cliente;
        $img = $pedido->img;

        return Inertia::render('Supervisor/Pedidos/AguardandoPagamento/Show',
            compact('pedido', 'cliente', 'img'));
    }

    public function update($id)
    {
        (new Pedido())->updateStatus($id, new AguardandoFaturamentoStatus());

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
