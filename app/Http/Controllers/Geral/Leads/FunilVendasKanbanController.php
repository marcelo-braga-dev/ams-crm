<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadContatoRealizado;
use App\Models\LeadsDEPREECATED\Leads;
use App\Models\Setores;
use App\Models\User;
use App\Services\Lead\UpdateStatusLeadService;
use App\Services\Leads\LeadFunilVendasService;
use App\src\Leads\StatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FunilVendasKanbanController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Geral/Leads/FunilVendas/Index', []);
    }

    public function setChatWhatsapp(Request $request)
    {
        $leadId = $request->input('lead_id');
        $telefoneId = $request->input('telefone_id');
        $origem = $request->input('origem');
        $meta = $request->input('meta');

        (new Leads())->setConatoData($leadId);

        $lead = (new Leads())->newQuery()->find($leadId);
        if ($lead->status === 'novo' ?? $lead->status === 'oportunidade') {
            (new UpdateStatusLeadService($leadId))->setOportunidadeStatus();
        }

        (new LeadContatoRealizado())->store($leadId, $telefoneId, $origem, $meta);
    }

    public function getIndexRegistros(Request $request)
    {
        $setor = $request->input("setor");
        $usuario = $request->input("usuario");
        $usuario = $usuario ?: id_usuario_atual();

        $colunas = (new StatusLeads())->sequenciaStatusDadosIndice($usuario);
        $usuarios = (new User())->subordinados();
        $setores = (new Setores())->setores();

        $cards = (new LeadFunilVendasService())->getLeadsGroupedByStatus($setor, $usuario);

        return response()->json(compact('cards', 'usuarios', 'setores', 'colunas'));
    }
}
