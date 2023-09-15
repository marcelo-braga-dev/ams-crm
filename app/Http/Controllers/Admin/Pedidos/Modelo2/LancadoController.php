<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo2;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosImagens;
use App\Models\PedidosProdutos;
use App\src\Pedidos\PedidoUpdateStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LancadoController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos())->getDadosPedido($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);

        return Inertia::render('Admin/Pedidos/Modelo2/Lancado/Show',
            compact('dados', 'produtos'));
    }

    public function update($id, Request $request)
    {
        try {
            (new PedidosImagens())->updateNotaFiscal($id, $request);
            (new PedidosImagens())->updateBoleto($id, $request);
            (new PedidosImagens())->updateLinkPagamento($id, $request);
            (new PedidoUpdateStatus())->setFaturado($id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
