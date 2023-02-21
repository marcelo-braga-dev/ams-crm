<?php

namespace App\Http\Controllers\Admin\Pedidos\Status;

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

        return Inertia::render('Admin/Pedidos/Lancado/Show',
            compact('dados'));
    }

    public function update($id, Request $request)
    {
        try {
            (new PedidoUpdateStatus())->lancado($id, convert_money_float($request->preco_custo));
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
