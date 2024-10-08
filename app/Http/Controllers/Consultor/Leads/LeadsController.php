<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Models\LeadsHistoricosComentarios;
use App\Models\Pins;
use App\Services\Leads\CardsLeadsService;
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
            $id = (new LeadsANTIGO())->create($request, setor_usuario_atual(), id_usuario_atual());

            modalSucesso('Cliente cadastrado com sucesso!');
            if (is_sdr(id_usuario_atual())) return redirect()->route('consultor.leads.novo.show', $id);
            return redirect()->route('consultor.leads.aberto.show', $id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
    }

    public function edit($id)
    {
        $dados = (new LeadsANTIGO())->newQuery()->find($id);
        $endereco = (new Enderecos())->get($dados->endereco);
        $telefones = [];
        $urlAnterior = url()->previous();

        return Inertia::render('Consultor/Leads/Edit',
            compact('dados', 'telefones', 'endereco', 'urlAnterior'));
    }

    public function update($id, Request $request)
    {
        try {
            (new LeadsANTIGO())->atualizar($id, $request);

            modalSucesso("Dados atualizado com sucesso!");
            return redirect($request->urlAnterior);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
    }

    public function updateClassificacao(Request $request)
    {
        (new LeadsANTIGO())->updateClassificacao($request->id, $request->valor);

        modalSucesso("Classificação atualizada!");
        return redirect()->back();
    }

    public function addComentarios(Request $request)
    {
        (new LeadsHistoricosComentarios())->create($request->id, $request->comentario);
    }

    public function atualizarStatus(Request $request)
    {
        (new LeadsHistoricos())->create($request->idLead, $request, $request->status);

        modalSucesso('Status atualizado!');
        return redirect()->back();

    }

    public function getLeads()
    {
        $leads = (new CardsLeadsService())->getConsultor(id_usuario_atual());

        return response()->json($leads);
    }

    public function alterarPin(Request $request)
    {
        (new Pins())->createLead($request->lead_id);
    }
}
