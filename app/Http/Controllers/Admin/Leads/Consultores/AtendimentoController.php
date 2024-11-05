<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getUsuarios($dados['infos']['setor']);
        $isEditar = (new UsersPermissoes())->isLeadsEditar(id_usuario_atual());
        $historicoStatus = (new LeadStatusHistoricos())->getId($id);

        return Inertia::render(
            'Admin/Leads/Relatorios/Cards/Atendimento/Show',
            compact('dados', 'status', 'historicos', 'contatos', 'historicoStatus', 'consultores', 'isEditar')
        );
    }

    public function voltarStatus($id)
    {
        (new UpdateStatusLeads())->setNovo($id);
        (new LeadsHistoricos())->createHistorico($id, (new NovoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-aberto.show', $id);
    }

    public function avancarStatus($id)
    {
        (new UpdateStatusLeads())->setAtivo($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtivoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-ativo.show', $id);
    }
}
