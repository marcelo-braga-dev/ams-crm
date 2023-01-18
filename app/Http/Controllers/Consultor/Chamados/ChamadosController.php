<?php

namespace App\Http\Controllers\Consultor\Chamados;

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
        $chamadosAll = (new PedidosChamados())->getConsultor();

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

        return Inertia::render('Consultor/Chamados/Index', compact('chamados'));
    }

    public function show($idChamado)
    {
        $chamado = (new PedidosChamados())->get($idChamado);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($chamado['id_pedido']);

        return Inertia::render('Consultor/Chamados/Show',
            compact('chamado', 'mensagens'));
    }
}
