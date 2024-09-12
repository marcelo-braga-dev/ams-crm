<?php

namespace App\Http\Controllers\Geral\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Pedidos\PedidosAnotacoes;
use App\Models\PedidosAcompanhamentos;
use App\Models\PedidosFretesTransportadoras;
use App\Models\PedidosHistoricos;
use App\Models\PedidosProdutos;
use App\Models\Sac;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function create(Request $request)
    {
        $leadId = $request->input('lead_id');

        return Inertia::render('Geral/Pedidos/Create');
    }

    public function show($id)
    {
        $transportadoras = (new PedidosFretesTransportadoras())->get();

        $pedido = (new Pedidos())->getDadosPedido($id);
        $historico = (new PedidosHistoricos())->historico($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);
        $historicoAcompanhamento = (new PedidosAcompanhamentos())->get($id);
        $sacHistorico = (new Sac())->pedido($id);
        $anotacoesHistorico = (new Pedidos\PedidosAnotacoes())->getDados($id);

        $urlPrevious = go_card($id);

        return Inertia::render('Geral/Pedidos/Show/Show',
            compact('pedido', 'historico', 'produtos', 'transportadoras', 'anotacoesHistorico', 'historicoAcompanhamento', 'sacHistorico', 'urlPrevious'));
    }

    public function addAnotacoes(Request $request)
    {
        (new PedidosAnotacoes())->create($request->pedido_id, $request->mensagem);

        modalSucesso('Anotação cadastrada com sucesso.');
        return redirect()->back();
    }
}
