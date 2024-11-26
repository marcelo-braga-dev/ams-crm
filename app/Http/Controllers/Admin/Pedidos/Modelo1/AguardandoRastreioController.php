<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AguardandoRastreioController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos)->getDadosPedido($id);

        return Inertia::render('Admin/Pedidos/AguardandoRastreio/Show',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new PedidoUpdateStatus())->setAcompanhamento($id, $request->rastreio_data);

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
