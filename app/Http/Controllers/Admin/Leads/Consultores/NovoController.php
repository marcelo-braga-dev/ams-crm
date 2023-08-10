<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function edit($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getConsultores($dados['infos']['setor']);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Novo/Edit',
            compact('dados', 'historicos', 'consultores'));
    }
    public function update($id)
    {
        (new UpdateStatusLeads())->novo($id);

        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }


    public function avancarStatus($id)
    {
        (new UpdateStatusLeads())->setAtendimento($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtendimentoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-atendimento.show', $id);
    }
}
