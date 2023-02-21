<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Pedidos\CardDadosService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();

        $fornecedorAtual = $request->fornecedor;
        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        $pedidos = (new CardDadosService())->getCards($fornecedorAtual, $setorAtual);

        return Inertia::render('Admin/Pedidos/Index',
            compact('pedidos', 'fornecedores', 'fornecedorAtual', 'setores', 'setorAtual'));
    }

    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);
        $historico = (new PedidosHistoricos())->historico($id);

        return Inertia::render('Admin/Pedidos/Show',
            compact('pedido', 'historico'));
    }

    public function destroy($id)
    {
        (new Pedidos())->remove($id);

        return redirect()->back();
    }
}
