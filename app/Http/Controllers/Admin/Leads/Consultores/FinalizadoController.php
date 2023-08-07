<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function GuzzleHttp\Promise\all;

class FinalizadoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getConsultores($dados['infos']['setor']);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Finalizado/Show',
            compact('dados', 'status', 'historicos', 'contatos', 'consultores'));
    }

    public function voltarStatus($id)
    {
        (new UpdateStatusLeads())->setAtendimento($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtendimentoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-atendimento.show', $id);
    }

    public function destroy($id, Request $request)
    {
        (new Leads())->remover($id);

        modalSucesso('Lead deletado com sucesso!');
        return redirect()->route('admin.leads.consultores-cards.index', ['id' => $request->consultor]);
    }

    public function updateConsultor(Request $request)
    {
        (new Leads())->setConsultor($request->lead, $request->novo_consultor);
        (new LeadsNotificacao())->notificar($request->novo_consultor, 1, [$request->lead]);

        modalSucesso('Consultor(a) Atualizado com sucesso!');
        return redirect()->route('admin.leads.consultores-cards.index', ['id' => $request->consultor]);
    }
}
