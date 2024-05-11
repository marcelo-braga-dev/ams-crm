<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosProdutos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LancadoController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos())->getDadosPedido($id);

        if ($dados['pedido']['modelo'] == 1) return Inertia::render('Admin/Pedidos/Lancado/Show',
            compact('dados'));

        $produtos = (new PedidosProdutos())->getProdutosPedido($id);

        return Inertia::render('Admin/Pedidos/Modelo2/Lancado/Show',
            compact('dados', 'produtos'));
    }

    public function update($id, Request $request)
    {
        try {
            $imposto = $request->imposto;
            $imposto = $imposto ? convert_money_float($imposto) : null;

            (new PedidoUpdateStatus())->lancado($id, convert_money_float($request->preco_custo), $imposto);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
