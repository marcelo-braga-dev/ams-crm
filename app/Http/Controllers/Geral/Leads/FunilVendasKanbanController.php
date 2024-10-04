<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use App\Models\Lead\LeadStatus;
use App\Models\LeadsDEPREECATED\Leads;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsDEPREECATED\LeadsContatosRealizados;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\LeadFunilVendasService;
use App\src\Leads\StatusLeads;
use App\src\Leads\StatusLeads\AFazerStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FunilVendasKanbanController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Geral/Leads/FunilVendas/Index', []);
    }

    public function getDados()
    {
        //  telefones,  status_data, classificacao,  avancar_status_url,
        $dados = (new LeadStatus())
            ->with('leads')
            ->orderBy('ordem')
            ->get();

        return response()->json(compact('dados'));
    }

    public function setChatWhatsapp(Request $request)
    {
        $leadId = $request->input('lead_id');
        $telefoneId = $request->input('telefone_id');
        $origem = $request->input('origem');
        $meta = $request->input('meta');

        (new Leads())->setConatoData($leadId);

        $lead = (new Leads())->newQuery()->find($leadId);
        if ($lead->status === 'novo') (new AFazerStatusLeads())->updateStatus($leadId); // remover

        (new LeadsContatosRealizados())->store($leadId, $telefoneId, $origem, $meta);
    }

    public function getIndexRegistros(Request $request)
    {
        $setor = $request->input("setor");
        $usuario = $request->input("usuario");

        $colunas = (new StatusLeads())->sequenciaStatusDadosIndice($usuario);
        $usuarios = (new User())->subordinados();
        $setores = (new Setores())->setores();

//        $registros = (new Leads)->cards($setor, $usuario);//

        $cards = (new LeadFunilVendasService())->getLeadsGroupedByStatus($setor, $usuario);

        return response()->json(compact('cards', 'usuarios', 'setores', 'colunas'));
    }
}
