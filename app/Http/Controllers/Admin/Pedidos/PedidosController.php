<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Fornecedores;
use App\Models\Franquias;
use App\Models\Pedidos;
use App\Models\PedidosAcompanhamentos;
use App\Models\PedidosHistoricos;
use App\Models\PedidosProdutos;
use App\Models\Setores;
use App\Services\Pedidos\CardDadosService;
use App\Services\Pedidos\PlanilhaProdutos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $setores = (new Setores())->get();
        $fornecedores = (new Fornecedores())->get();
        $coresAbas = (new ConfigCores())->getPedidos();
        $goCard = $request->id_card;

        return Inertia::render('Admin/Pedidos/Index',
            compact('fornecedores', 'setores', 'coresAbas', 'goCard'));
    }

    public function show($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);
        $historico = (new PedidosHistoricos())->historico($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);
        $historicoAcompanhamento = (new PedidosAcompanhamentos())->get($id);

        $urlPrevious = \Illuminate\Http\Request::create(url()->previous())->fullUrlWithQuery(['id_card' => $id]);

        return Inertia::render('Admin/Pedidos/Show',
            compact('pedido', 'historico', 'produtos', 'historicoAcompanhamento', 'urlPrevious'));
    }

    public function destroy($id)
    {
        (new Pedidos())->remove($id);

        return redirect()->back();
    }

    public function pedidos(Request $request)
    {
        $setorAtual = null;
        if ($request->setor == 'todos') {
            session(['sessaoSetor' => null]);
        }
        if ($request->setor) {
            $setorAtual = $request->setor;
            $dadosSetor = (new Setores())->find($setorAtual);
            session(['sessaoSetor' => $dadosSetor]);
        }

        $pedidos = (new CardDadosService())->getCards(null, $request->fornecedor, $setorAtual);

        return response()->json(['pedidos' => $pedidos, 'modelo' => modelo_setor($setorAtual)]);
    }

    public function gerarPlanilhaPedidos(Request $request)
    {
        return response()->json((new PlanilhaProdutos())->gerar($request->dataInicio, $request->dataFim, $request->setor));
    }
}
