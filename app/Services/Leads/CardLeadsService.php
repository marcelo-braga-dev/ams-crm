<?php

namespace App\Services\Leads;

use App\Models\Leads;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\CanceladoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;

class CardLeadsService
{
    private array $cards;

    public function getConsultor(int $id)
    {
        $this->cards($id);

        return $this->cards;
    }

    private function cards($id): void
    {
        $novo = (new NovoStatusLeads())->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $ativo = (new AtivoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();
        $cancelado = (new CanceladoStatusLeads())->getStatus();

        $leads = (new Leads());

        $this->cards['novo'] = $leads->getPeloStatus($id, $novo, 'asc');
        $this->cards['atendimento'] = $leads->getPeloStatus($id, $atendimento);
        $this->cards['ativo'] = $leads->getPeloStatus($id, $ativo);
        $this->cards['finalizado'] = $leads->getPeloStatus($id, $finalizado);
        $this->cards['cancelado'] = $leads->getPeloStatus($id, $cancelado);
    }
}
