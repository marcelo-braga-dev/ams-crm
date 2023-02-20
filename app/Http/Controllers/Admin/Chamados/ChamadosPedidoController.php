<?php

namespace App\Http\Controllers\Admin\Chamados;

use App\Http\Controllers\Controller;
use App\Models\PedidosChamados;
use App\Services\Chamados\ChamadoDadosCardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamadosPedidoController extends Controller
{
    public function show($id)
    {
        $chamados = (new PedidosChamados())->getChamadosPedido($id);
        $idPedido = $id;

        return Inertia::render('Admin/Chamados/Pedidos/Show',
            compact('chamados', 'idPedido'));
    }
}
