<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Models\LeadsStatusHistoricos;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\UpdateStatusLeads;
use Inertia\Inertia;

class AbertoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getUsuarios($dados['infos']['setor']);
        $historicoStatus = (new LeadsStatusHistoricos())->getId($id);
        $isSdr = is_sdr();
        $idUsuarioCard = $id;

        return Inertia::render('Admin/Leads/Relatorios/Cards/Aberto/Show',
            compact('dados', 'historicos', 'consultores', 'isSdr', 'historicoStatus', 'idUsuarioCard'));
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
