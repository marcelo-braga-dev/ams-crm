<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Models\LeadsHistoricosComentarios;
use App\Services\Leads\CardLeadsService;
use App\Services\Leads\CardsLeadsService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index()
    {
        $isSdr = is_sdr();

        return Inertia::render('Consultor/Leads/Index', compact('isSdr'));
    }

    public function create()
    {
        return Inertia::render('Consultor/Leads/Create');
    }

    public function store(Request $request)
    {
        try {
            $id = (new Leads())->create($request, setor_usuario_atual(), id_usuario_atual());

            modalSucesso('Cliente cadastrado com sucesso!');
            return redirect()->route('consultor.leads.novo.show', $id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
    }

    public function edit($id)
    {
        $dados = (new Leads())->newQuery()->find($id);

        return Inertia::render('Consultor/Leads/Edit', compact('dados'));
    }

    public function update($id, Request $request)
    {
        try {
            (new Leads())->atualizar($id, $request);
            $leads = (new Leads())->find($id);
            modalSucesso("Dados atualizado com sucesso!");
            if ($leads->status == (new AtendimentoStatusLeads())->getStatus()) return redirect()->route('consultor.leads.atendimento.show', $id);
            if ($leads->status == (new AtivoStatusLeads())->getStatus()) return redirect()->route('consultor.leads.ativo.show', $id);
            return redirect()->route('consultor.leads.main.index');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
    }

    public function updateClassificacao(Request $request)
    {
        (new Leads())->updateClassificacao($request->id, $request->valor);

        modalSucesso("Classificação atualizada!");
        return redirect()->back();
    }

    public function addComentarios(Request $request)
    {
        (new LeadsHistoricosComentarios())->create($request->id, $request->comentario);
    }

    public function atualizarStatus(Request $request)
    {
        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($request->idLead, $request, $request->status);

            modalSucesso('Status atualizado!');
            return redirect()->back();
        }
    }

    public function getLeads()
    {
        $leads = (new CardsLeadsService())->getConsultor(id_usuario_atual());

        return response()->json($leads);
    }
}
