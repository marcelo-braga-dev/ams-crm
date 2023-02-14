<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;
use App\Services\Chamados\ChamadoDadosCardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamadosController extends Controller
{
    public function index()
    {
        $chamados = (new ChamadoDadosCardService())->cardsConsultor();

        return Inertia::render('Consultor/Chamados/Index', compact('chamados'));
    }

    public function show($idChamado)
    {
        $chamado = (new PedidosChamados())->get($idChamado);
        $pedido = (new Pedidos())->getDadosPedido($chamado['id_pedido']);
        $mensagens = (new PedidosChamadosHistoricos())->getMensagens($idChamado);

        return Inertia::render('Consultor/Chamados/Show',
            compact('chamado', 'pedido', 'mensagens'));
    }
}
