<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use App\Models\Lead\LeadStatus;
use App\Models\LeadsDEPREECATED\Leads;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\LeadFunilVendasService;
use App\src\Leads\StatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FunilVendasKanbanController extends Controller
{
    public function index(Request $request)
    {
//        print_pre((new LeadFunilVendasService())->getLeadsGroupedByStatus(null, null));
//        $dados = (new LeadStatus())
//            ->with('leads')
//            ->orderBy('ordem')
//            ->get();
//
//        print_pre($dados->toArray());

        return Inertia::render('Admin/Leads/Kanban/Index');
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

    public function getIndexRegistros(Request $request)
    {
        $setor = $request->input("setor");
        $usuario = $request->input("usuario");

        $colunas = (new StatusLeads())->sequenciaStatusDadosIndice($usuario);
        $usuarios = (new User())->subordinados();
        $setores = (new Setores())->setores();

        $registros = (new Leads)->cards($setor, $usuario);

        $cards = (new LeadFunilVendasService())->getLeadsGroupedByStatus($setor, $usuario);

        return response()->json(compact('cards', 'registros', 'usuarios', 'setores', 'colunas'));
    }
}
