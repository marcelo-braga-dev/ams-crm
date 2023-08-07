<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Http\Controllers\Controller;
use App\Models\LeadsHistoricosComentarios;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\StatusAtendimentoLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtivoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Ativo/Show',
            compact('dados', 'status', 'historicos', 'contatos'));
    }

    public function store(Request $request)
    {
        (new LeadsHistoricosComentarios())->create($request->id, $request->msg);
    }
}
