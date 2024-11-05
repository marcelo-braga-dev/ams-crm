<?php

namespace App\src\Leads\Status;

use App\src\Leads\StatusLeads\AtivoStatusLead;
use App\src\Leads\StatusLeads\ConexaoProativaStatusLead;
use App\src\Leads\StatusLeads\ContatoDiretoStatusLead;
use App\src\Leads\StatusLeads\CotacaoEnviadoStatusLead;
use App\src\Leads\StatusLeads\FinalizadoStatusLead;
use App\src\Leads\StatusLeads\InativoStatusLead;
use App\src\Leads\StatusLeads\InicioFunilStatusLead;
use App\src\Leads\StatusLeads\NovoStatusLead;
use App\src\Leads\StatusLeads\OportunidadeStatusLead;
use App\src\Leads\StatusLeads\SuperOporunidadeStatusLead;

/**
 * @deprecated
 */
class StatusLeads
{
    public function nomesStatus(): array
    {
        $novo = (new NovoStatusLead());
        $ativo = (new AtivoStatusLead());
        $conexaoProativa = (new ConexaoProativaStatusLead);
        $contatoDireto = (new ContatoDiretoStatusLead);
        $cotacaoEnviado = (new CotacaoEnviadoStatusLead());
        $finalizado = (new FinalizadoStatusLead());
        $inativo = (new InativoStatusLead());
        $inicioFunil = (new InicioFunilStatusLead());
        $oportunidade = (new OportunidadeStatusLead);
        $reativar = (new SuperOporunidadeStatusLead());

        return [
            $novo->getStatus() => $novo->getStatusNome(),
            $ativo->getStatus() => $ativo->getStatusNome(),
            $conexaoProativa->getStatus() => $conexaoProativa->getStatusNome(),
            $contatoDireto->getStatus() => $contatoDireto->getStatusNome(),
            $cotacaoEnviado->getStatus() => $cotacaoEnviado->getStatusNome(),
            $finalizado->getStatus() => $finalizado->getStatusNome(),
            $inativo->getStatus() => $inativo->getStatusNome(),
            $inicioFunil->getStatus() => $inicioFunil->getStatusNome(),
            $oportunidade->getStatus() => $oportunidade->getStatusNome(),
            $reativar->getStatus() => $reativar->getStatusNome(),
        ];
    }

    public function nome($status)
    {
        $nomes = $this->nomesStatus();
        return $nomes[$status] ?? '';
    }

    public function nomeCor($status): array
    {
        $novo = (new NovoStatusLead());
        $ativo = (new AtivoStatusLead());
        $conexaoProativa = (new ConexaoProativaStatusLead);
        $contatoDireto = (new ContatoDiretoStatusLead);
        $cotacaoEnviado = (new CotacaoEnviadoStatusLead());
        $finalizado = (new FinalizadoStatusLead());
        $inativo = (new InativoStatusLead());
        $inicioFunil = (new InicioFunilStatusLead());
        $oportunidade = (new OportunidadeStatusLead);
        $reativar = (new SuperOporunidadeStatusLead());

        $statusClass = match ($status) {
            $novo->getStatus() => $novo,
            $ativo->getStatus() => $ativo,
            $conexaoProativa->getStatus() => $conexaoProativa,
            $contatoDireto->getStatus() => $contatoDireto,
            $cotacaoEnviado->getStatus() => $cotacaoEnviado,
            $finalizado->getStatus() => $finalizado,
            $inativo->getStatus() => $inativo,
            $inicioFunil->getStatus() => $inicioFunil,
            $oportunidade->getStatus() => $oportunidade,
            $reativar->getStatus() => $reativar,
            default => $inativo,
        };

        return ['nome' => $statusClass->getStatusNome(), 'cor' => $statusClass->statusCor()];
    }
}
