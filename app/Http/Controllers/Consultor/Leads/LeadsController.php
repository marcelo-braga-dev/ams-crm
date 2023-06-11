<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Leads\CardLeadsService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
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
        $count = false;

        foreach ($request->all() as $item) {
            try {
                $count = (new Leads())->create($item, setor_usuario_atual(), id_usuario_atual());
            } catch (\DomainException) {
                modalErro('Alguns LEADS não cadastrados');
            }
        }
        if (!$count) return redirect()->back();
        return redirect()->route('consultor.leads.main.index');
    }

    public function edit($id)
    {
        $dados = (new Leads())->newQuery()->find($id);

        return Inertia::render('Consultor/Leads/Edit', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new Leads())->atualizar($id, $request);
        $leads = (new Leads())->find($id);

        modalSucesso("Dados atualizado com sucesso!");

        if ($leads->status == (new AtendimentoStatusLeads())->getStatus()) return redirect()->route('consultor.leads.atendimento.show', $id);
        if ($leads->status == (new AtivoStatusLeads())->getStatus()) return redirect()->route('consultor.leads.ativo.show', $id);
        return redirect()->route('consultor.leads.main.index');
    }

    public function updateClassificacao(Request $request)
    {
        (new Leads())->updateClassificacao($request->id, $request->valor);

        modalSucesso("Classificação atualizada!");
        return redirect()->back();
    }
}
