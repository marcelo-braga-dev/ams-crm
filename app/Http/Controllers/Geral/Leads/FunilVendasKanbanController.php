<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads\Leads;
use App\Models\Leads\LeadsANTIGO;
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
        $setor = $request->input('setor');
        $usuario = $request->input('usuario');

        $dados = (new LeadFunilVendasService())->getLeadsGroupedByStatus($setor, $usuario);
//        print_pre($dados);


        return Inertia::render('Admin/Leads/Kanban/Index');
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
