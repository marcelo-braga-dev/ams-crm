<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsEncaminhados;
use App\Models\Setores;
use App\Models\User;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\PreAtendimentoStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index()
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');

        $setores = (new Setores())->get();

        return Inertia::render('Admin/Dashboard/Leads/Index',
            compact('mes', 'ano', 'setores'));
    }
}
