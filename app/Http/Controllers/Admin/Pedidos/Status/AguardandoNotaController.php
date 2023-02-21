<?php

namespace App\Http\Controllers\Admin\Pedidos\Status;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AguardandoNotaController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos)->getDadosPedido($id);

        return Inertia::render('Admin/Pedidos/AguardandoNota/Show',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->aguardandoBoleto($id, $request);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
