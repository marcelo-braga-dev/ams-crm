<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinalizadoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getUsuarios($dados['infos']['setor']);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Finalizado/Show',
            compact('dados', 'status', 'historicos', 'contatos', 'consultores'));
    }

    public function voltarStatus($id)
    {
        (new UpdateStatusLeads())->setNovo($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtendimentoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-novo.show', $id);
    }

    public function destroy($id, Request $request)
    {
        try {
            (new LeadsANTIGO())->remover($id);
            modalSucesso('Lead deletado com sucesso!');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        return redirect()->route('admin.leads.consultores-cards.index', ['id' => $request->consultor]);
    }
}
