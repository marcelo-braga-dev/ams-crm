<?php

namespace App\Http\Controllers\Supervisor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Pedidos\CardDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $setor = auth()->user()->setor;
        $fornecedorAtual = $request->fornecedor;

        $fornecedores = (new FornecedoresService())->fornecedores($setor);
        $pedidos = (new CardDadosService())->getCards(null, $fornecedorAtual, $setor);
        $coresAbas = (new ConfigCores())->getPedidos();

        return Inertia::render('Supervisor/Pedidos/Index',
            compact('pedidos', 'fornecedores', 'fornecedorAtual', 'coresAbas'));
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
