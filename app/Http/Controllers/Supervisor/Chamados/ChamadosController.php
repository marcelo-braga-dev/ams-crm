<?php

namespace App\Http\Controllers\Supervisor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;
use App\Services\Chamados\ChamadoDadosCardService;
use App\src\Chamados\Status\FinalizadosChamadoStatus;
use App\src\Chamados\Status\NovoChamadoStatus;
use App\src\Chamados\Status\RespondidoChamadoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamadosController extends Controller
{
    public function index()
    {
        $dados = (new ChamadoDadosCardService())->cardsAdmin();

        return Inertia::render('Supervisor/Chamados/Index', compact('dados'));
    }

    public function show($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $pedido = (new Pedidos())->getV2($chamado['id_pedido']);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($id);

        return Inertia::render('Supervisor/Chamados/Show',
            compact('pedido', 'chamado', 'mensagens'));
    }

    public function create(Request $request)
    {
        $pedido = (new Pedidos())->getV2($request->id);

        return Inertia::render('Supervisor/Chamados/Create', compact('pedido'));
    }

    public function store(Request $request)
    {
        (new NovoChamadoStatus())->create($request->id, $request->titulo, $request->mensagem);

        modalSucesso('Chamado criado com sucesso!');
        return redirect()->route('supervisor.chamados.index');
    }

    public function edit($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $pedido = (new Pedidos())->getV2($chamado['id_pedido']);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($id);

        return Inertia::render('Supervisor/Chamados/Edit',
            compact('chamado', 'pedido', 'mensagens'));
    }

    public function update(Request $request)
    {
        if ($request->finalizar) {
            (new FinalizadosChamadoStatus())->updateStatus($request->id_pedido, $request->id_chamado, $request->mensagem);
            (new Pedidos())->updateChamado($request->id_pedido, 0);
        } else {
            (new RespondidoChamadoStatus())
                ->responder($request->id_pedido, $request->id_chamado, $request->mensagem);
        }

        return redirect()->route('supervisor.chamados.index');
    }
}
