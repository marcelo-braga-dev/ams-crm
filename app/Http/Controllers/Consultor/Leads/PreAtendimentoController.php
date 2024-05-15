<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsEncaminhados;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Historicos\AtivadoHistorico;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreAtendimentoController extends Controller
{
    public function show($id)
    {
        $dados = (new Leads())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render(
            'Consultor/Leads/PreAtendimento/Show',
            compact('dados', 'status', 'historicos', 'contatos')
        );
    }

    public function update($id, Request $request)
    {

        $lead = (new Leads())->find($id);

        $ultimo = (new LeadsEncaminhados())->ultimoVendedorEnviado();
        $vendedores = (new User())->usuariosRecebeLeadsId($lead->setor_id);

        $idEnviar = $vendedores[0];

        for ($i = 0; $i < count($vendedores); $i++) {
            if (($ultimo) < ($vendedores[$i])) {
                $idEnviar = $vendedores[$i];
                break;
            }
        }

        (new LeadsEncaminhados())->create($idEnviar, $id);
        (new Leads())->updateUser($id, $idEnviar);
        (new UpdateStatusLeads())->setAberto($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtivadoHistorico())->status());

        modalSucesso('Cliente Encaminhado com Sucesso!');
        return redirect()->route('consultor.leads.main.index', $id);
    }

    public function store(Request $request)
    {
        // Finaliza Atendimento
        (new UpdateStatusLeads())->setFinalizado($request->id);
        (new LeadsHistoricos())->create($request->idLead, $request, $request->status);
        $request['msg'] = '';
        (new LeadsHistoricos())->create($request->id, $request, 'finalizado');

        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }
}
