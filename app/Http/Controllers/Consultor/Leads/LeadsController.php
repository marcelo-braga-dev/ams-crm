<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Leads\CardLeadsService;
use App\Services\Leads\LeadsDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index()
    {
        $leads = (new CardLeadsService())->getConsultor(id_usuario_atual());

        return Inertia::render('Consultor/Leads/Index',
            compact('leads'));
    }

    public function create()
    {
        return Inertia::render('Consultor/Leads/Create');
    }

    public function show($id)
    {
        $cliente = (new Leads())->newQuery()->find($id);
        return Inertia::render('Consultor/Leads/Show', compact('cliente'));
    }

    public function store(Request $request)
    {
        return redirect()->route('consultor.leads.main.index');
    }

    public function edit($id)
    {
        $dados = (new Leads())->newQuery()->find($id);

        return Inertia::render('Consultor/Leads/Atendimento/Edit', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new Leads())->atualizar($id, $request);

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('consultor.leads.atendimento.show', $id);
    }
}
