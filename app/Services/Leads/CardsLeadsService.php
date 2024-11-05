<?php

namespace App\Services\Leads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\src\Leads\Status\AbertoStatusLeads;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\PreAtendimentoStatusLeads;

class CardsLeadsService
{
    public function getConsultor(int $id)
    {
        $novo = (new NovoStatusLeads())->getStatus();
        $preAtendimento = (new PreAtendimentoStatusLeads)->getStatus();
        $aberto = (new AbertoStatusLeads)->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $ativo = (new AtivoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();

        $leads = (new LeadsANTIGO())->getCards($id);

        $novo = ($leads->where('status', $novo))->toArray();
        sort($novo);

        $cardsLeads['novo'] = $novo;
        $cardsLeads['pre_atendimento'] = [...$leads->where('status', $preAtendimento)];
        $cardsLeads['aberto'] = [...$leads->where('status', $aberto)];
        $cardsLeads['atendimento'] = [...$leads->where('status', $atendimento)];
        $cardsLeads['ativo'] = [...$leads->where('status', $ativo)];
        $cardsLeads['finalizado'] = [...$leads->where('status', $finalizado)];

        return $cardsLeads;
    }
}
