<?php

namespace App\Http\Controllers\Consultor\Chamados;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Sac;
use App\Models\SacMensagens;
use App\Services\Chamados\CardsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChamadosController extends Controller
{
    public function index()
    {
        $sac = (new CardsService())->cards();

        return Inertia::render('Consultor/Chamados/Index', compact('sac'));
    }

    public function create(Request $request)
    {
        $pedido = $request->pedido_id;

        return Inertia::render('Consultor/Chamados/Create', compact('pedido'));
    }

    public function store(Request $request)
    {
        (new Sac())->create($request);

        modalSucesso('SAC aberto com sucesso!');
        return redirect()->route('consultor.chamados.index');
    }

    public function update($id, Request $request)
    {
        (new SacMensagens())->create($id, $request);

        modalSucesso('Mensagem adicionada com sucesso!');
        return redirect()->back();
    }
}
