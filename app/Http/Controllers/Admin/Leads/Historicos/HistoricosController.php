<?php

namespace App\Http\Controllers\Admin\Leads\Historicos;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricosController extends Controller
{
    public function index(Request $request)
    {
        $historicoLeads = (new Notificacoes())->getHistorico(null, 1000);

        return Inertia::render('Admin/Leads/Historicos/Index', compact('historicoLeads'));
    }
}
