<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function show($id, Request $request)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getUsuarios($dados['infos']['setor']);
        $usuarioCard = $request->usuario_card;

        return Inertia::render('Admin/Leads/Relatorios/Cards/Novo/Edit',
            compact('dados', 'historicos', 'consultores', 'usuarioCard'));
    }

    /**
     * @deprecated
     */
    public function edit($id)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getUsuarios($dados['infos']['setor']);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Novo/Edit',
            compact('dados', 'historicos', 'consultores'));
    }
    public function update($id)
    {
        (new UpdateStatusLeads())->setPreAtendimento($id);

        modalSucesso('Status atualizado!');
        return redirect()->route('admin.leads.cards-pre_atendimento.show', $id);
    }


    public function avancarStatus($id)
    {
        (new UpdateStatusLeads())->setAtendimento($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtendimentoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-atendimento.show', $id);
    }
}
