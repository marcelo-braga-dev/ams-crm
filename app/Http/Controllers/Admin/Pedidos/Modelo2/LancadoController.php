<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo2;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LancadoController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos())->getDadosPedido($id);

        return Inertia::render('Admin/Pedidos/Modelo2/Lancado/Show',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        try {
            (new PedidoUpdateStatus())->setFaturado($id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
