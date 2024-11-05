<?php

namespace App\Http\Controllers\Admin\Leads\Historicos;

use App\Http\Controllers\Controller;
use App\Models\LeadsHistoricos;
use App\Models\Notificacoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricosController extends Controller
{
    public function index(Request $request)
    {
        $historicoNotificacoes = (new Notificacoes())->getHistorico(null, 1000);
        $historicoLeads = (new LeadsHistoricos())->historico();
//        print_pre($historicoLeads);

        return Inertia::render('Admin/Leads/Historicos/Index', compact('historicoNotificacoes', 'historicoLeads'));
    }
}
