<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AguardandoPagamentoController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos)->getV2($id);

        return Inertia::render('Admin/Pedidos/AguardandoPagamento/Show',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->pagamento($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
