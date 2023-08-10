<?php

namespace App\src\Leads\Status;

class StatusLeads
{
    public function status(): array
    {
        $novo = (new NovoStatusLeads());
        $atendimento = (new AtendimentoStatusLeads());
        $ativo = (new AtivoStatusLeads());
        $finalizado = (new FinalizadoStatusLeads());

        return [
            $novo->getStatus(),
            $atendimento->getStatus(),
            $ativo->getStatus(),
            $finalizado->getStatus(),
        ];
    }
}
