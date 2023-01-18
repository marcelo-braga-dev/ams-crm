<?php

namespace App\Http\Controllers\Supervisor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;
use App\Services\Chamados\ChamadosService;
use App\Services\Pedidos\PedidosServices;
use App\src\Chamados\Status\AnaliseChamadosStatus;
use App\src\Chamados\Status\FinalizadosChamadoStatus;
use App\src\Chamados\Status\NovoChamadoStatus;
use App\src\Chamados\Status\RespondidoChamadoStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamadosController extends Controller
{
    public function index()
    {
        $chamadosAll = (new PedidosChamados())->newQuery()->get();

        $novoStatus = (new NovoChamadoStatus())->getStatus();
        $analiseStatus = (new AnaliseChamadosStatus())->getStatus();
        $respondidoStatus = (new RespondidoChamadoStatus())->getStatus();
        $finalizadosStatus = (new FinalizadosChamadoStatus())->getStatus();

        $service = new ChamadosService();
        $chamados['novo'] = [];
        $chamados['analise'] = [];
        $chamados['respondido'] = [];
        $chamados['finalizado'] = [];

        foreach ($chamadosAll as $item) {
            switch ($item->status) {
                case $novoStatus :
                    $chamados['novo'][] = $service->chamado($item);
                    break;
                case $analiseStatus :
                    $chamados['analise'][] = $service->chamado($item);
                    break;
                case $respondidoStatus :
                    $chamados['respondido'][] = $service->chamado($item);
                    break;
                case $finalizadosStatus :
                    $chamados['finalizado'][] = $service->chamado($item);
                    break;
            }
        }

        return Inertia::render('Supervisor/Chamados/Index', compact('chamados'));
    }

    public function show($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($id);

        return Inertia::render('Supervisor/Chamados/Show',
            compact('chamado', 'mensagens'));
    }

    public function create(Request $request)
    {
        $pedidoDados = (new Pedidos())->newQuery()->findOrFail($request->id);
        $pedido = (new PedidosServices())->pedido($pedidoDados);

        return Inertia::render('Supervisor/Chamados/Create', compact('pedido'));
    }

    public function store(Request $request)
    {
        (new NovoChamadoStatus())->create($request->id, $request->titulo, $request->mensagem);

        modalSucesso('Chamado criado com sucesso!');
        return redirect()->route('admin.chamado.index');
    }

    public function edit($id)
    {
        $chamado = (new PedidosChamados())->get($id);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($id);

        return Inertia::render('Supervisor/Chamados/Edit',
            compact('chamado', 'mensagens'));
    }

    public function update(Request $request)
    {
        (new RespondidoChamadoStatus())
            ->responder($request->id_pedido, $request->id_chamado, $request->mensagem);

        if ($request->finalizar) {
            (new FinalizadosChamadoStatus())->updateStatus($request->id_pedido);
            (new Pedidos())->updateChamado($request->id_pedido, 0);
        }

        return redirect()->route('admin.chamado.index');
    }
}
