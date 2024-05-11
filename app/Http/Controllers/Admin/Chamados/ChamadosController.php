<?php

namespace App\Http\Controllers\Admin\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;
use App\Services\Chamados\ChamadoDadosCardService;
use App\Services\Chamados\MensagensChamadosService;
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

        return Inertia::render('Admin/Chamados/Index', compact('dados'));
    }

    public function show($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $pedido = (new Pedidos())->getDadosPedido($chamado['id_pedido']);
        $mensagens = (new MensagensChamadosService())->mensagens($id);

        return Inertia::render('Admin/Chamados/Show',
            compact('chamado', 'pedido', 'mensagens'));
    }

    public function create(Request $request)
    {
        $pedido = (new Pedidos())->getDadosPedido($request->id);

        return Inertia::render('Admin/Chamados/Create', compact('pedido'));
    }

    public function store(Request $request)
    {
        (new NovoChamadoStatus())
            ->create($request->id, $request->titulo, $request->mensagem, $request);

        modalSucesso('Chamado criado com sucesso!');
        return redirect()->route('admin.chamado.index');
    }

    public function edit($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $pedido = (new Pedidos())->getDadosPedido($chamado['id_pedido']);
        $mensagens = (new MensagensChamadosService())->mensagens($id);

        return Inertia::render('Admin/Chamados/Edit',
            compact('chamado', 'pedido', 'mensagens'));
    }

    public function update(Request $request)
    {
        if ($request->finalizar) {
            (new FinalizadosChamadoStatus())
                ->updateStatus($request->id_pedido, $request->id_chamado, $request->mensagem, $request);
            (new Pedidos())->updateChamado($request->id_pedido, 0);
            return redirect()->route('admin.chamado.index');
        } else {
            (new RespondidoChamadoStatus())
                ->responder($request->id_pedido, $request->id_chamado, $request->mensagem, $request);
        }

        return redirect()->back();
    }
}
