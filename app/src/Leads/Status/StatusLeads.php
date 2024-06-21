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
        $inativo = (new InativoStatusLeads());

        return [
            $novo->getStatus() => $novo->getNome(),
            $aberto->getStatus() => $aberto->getNome(),
            $preAtendimento->getStatus() => $preAtendimento->getNome(),
            $atendimento->getStatus() => $atendimento->getNome(),
            $ativo->getStatus() => $ativo->getNome(),
            $finalizado->getStatus() => $finalizado->getNome(),
            $inativo->getStatus() => $inativo->getNome(),
        ];
    }

    public function nome($status)
    {
        $nomes = $this->nomesStatus();
        return $nomes[$status] ?? '';
    }

    public function nomeCor($status)
    {
        $novo = (new NovoStatusLeads());
        $preAtendimento = (new PreAtendimentoStatusLeads());
        $aberto = (new AbertoStatusLeads());
        $atendimento = (new AtendimentoStatusLeads());
        $ativo = (new AtivoStatusLeads());
        $finalizado = (new FinalizadoStatusLeads());
        $inativo = (new InativoStatusLeads());

        $status = match ($status) {
            $novo->getStatus() => (new NovoStatusLeads()),
            $aberto->getStatus() => (new AbertoStatusLeads()),
            $preAtendimento->getStatus() => (new PreAtendimentoStatusLeads()),
            $atendimento->getStatus() => (new AtendimentoStatusLeads()),
            $ativo->getStatus() => (new AtivoStatusLeads()),
            $finalizado->getStatus() => (new FinalizadoStatusLeads()),
            $inativo->getStatus() => (new InativoStatusLeads()),
        };

        return ['nome' => $status->getNome(), 'cor' => $status->getCor()];
    }
}
