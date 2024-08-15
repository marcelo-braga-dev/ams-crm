<?php

namespace App\Http\Controllers\Admin\Chamados;

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

        return Inertia::render('Admin/Chamados/Index', compact('sac'));
    }

    public function show($id)
    {
        $chamado = (new Sac())->find($id);

        switch ($chamado['status']) {
            case 'novo':
                return redirect()->route('admin.chamado.aberto.show', $chamado['id']);
            case 'atendimento':
                return redirect()->route('admin.chamado.atendimento.show', $chamado['id']);
            case 'finalizado':
                return redirect()->route('admin.chamado.finalizado.show', $chamado['id']);
            default:
                redirect()->back();
        }
    }

    public function create(Request $request)
    {
        $pedido = $request->pedido_id;

        return Inertia::render('Admin/Chamados/Create', compact('pedido'));
    }

    public function store(Request $request)
    {
        (new Sac())->create($request);

        modalSucesso('SAC aberto com sucesso!');
        return redirect()->route('admin.chamados.index');
    }

    public function update($id, Request $request)
    {
        (new SacMensagens())->create($id, $request);

        modalSucesso('Mensagem adicionada com sucesso!');
        return redirect()->back();
    }
}
