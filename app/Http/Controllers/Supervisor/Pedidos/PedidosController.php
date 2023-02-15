<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Services\Notificacoes\FornecedoresService;
use App\Services\Pedidos\CardDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $fornecedorAtual = $request->fornecedor;
        $fornecedores = (new FornecedoresService())->fornecedores();
        $pedidos = (new CardDadosService())->getCards($fornecedorAtual);

        return Inertia::render('Supervisor/Pedidos/Index',
            compact('pedidos', 'fornecedores', 'fornecedorAtual'));
    }

    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);
        $historico = (new PedidosHistoricos())->historico($id);

        return Inertia::render('Supervisor/Pedidos/Show',
            compact('pedido', 'historico'));
    }

    public function destroy($id)
    {
        (new Pedidos())->remove($id);

        return redirect()->back();
    }
}
