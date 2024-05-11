<?php

namespace App\src\Leads\Status;

class StatusLeads
{
    public function nomesStatus(): array
    {
        $novo = (new NovoStatusLeads());
        $aberto = (new AbertoStatusLeads());
        $preAtendimento = (new PreAtendimentoStatusLeads());
        $atendimento = (new AtendimentoStatusLeads());
        $ativo = (new AtivoStatusLeads());
        $finalizado = (new FinalizadoStatusLeads());

        return [
            $novo->getStatus() => $novo->getNome(),
            $aberto->getStatus() => $aberto->getNome(),
            $preAtendimento->getStatus() => $preAtendimento->getNome(),
            $atendimento->getStatus() => $atendimento->getNome(),
            $ativo->getStatus() => $ativo->getNome(),
            $finalizado->getStatus() => $finalizado->getNome(),
        ];
    }
}
