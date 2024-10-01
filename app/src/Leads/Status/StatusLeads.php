<?php

namespace App\src\Leads\Status;

use App\src\Leads\StatusLeads\AFazerStatusLeads;
use App\src\Leads\StatusLeads\ConcluidoStatusLeads;
use App\src\Leads\StatusLeads\EmProgressoStatusLeads;
use App\src\Leads\StatusLeads\InicioFunilStatusLeads;
use App\src\Leads\StatusLeads\RevisaoStatusLeads;

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

        $fazer = (new AFazerStatusLeads());
        $progresso = (new EmProgressoStatusLeads());
        $inicioFunil = (new InicioFunilStatusLeads());
        $revisao = (new RevisaoStatusLeads());

        $concluido = (new ConcluidoStatusLeads());

        $statusClass = match ($status) {
            $fazer->status() => $fazer,
            $progresso->status() => $progresso,
            $inicioFunil->status() => $inicioFunil,
            $revisao->status() => $revisao,
            $concluido->status() => $concluido,
            default => null,
        };

        if ($statusClass) return ['nome' => $statusClass->statusNome(), 'cor' => $statusClass->statusCor()];


        $statusClass = match ($status) {
            $novo->getStatus() => (new NovoStatusLeads()),
            $aberto->getStatus() => (new AbertoStatusLeads()),
            $preAtendimento->getStatus() => (new PreAtendimentoStatusLeads()),
            $atendimento->getStatus() => (new AtendimentoStatusLeads()),
            $ativo->getStatus() => (new AtivoStatusLeads()),
            $finalizado->getStatus() => (new FinalizadoStatusLeads()),
            $inativo->getStatus() => (new InativoStatusLeads()),
            default => (new BaixadaStatusLeads()),
        };

        return ['nome' => $statusClass->getNome(), 'cor' => $statusClass->getCor()];
    }
}
