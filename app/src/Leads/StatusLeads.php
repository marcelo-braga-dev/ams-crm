<?php

namespace App\src\Leads;

use App\Services\Permissoes\LeadsKanbanPermissoesServices;
use App\src\Leads\StatusLeads\ConexaoProativaStatusLead;
use App\src\Leads\StatusLeads\AtivoStatusLead;
use App\src\Leads\StatusLeads\ContatoDiretoStatusLead;
use App\src\Leads\StatusLeads\FinalizadoStatusLead;
use App\src\Leads\StatusLeads\InativoStatusLead;
use App\src\Leads\StatusLeads\InicioFunilStatusLead;
use App\src\Leads\StatusLeads\OportunidadeStatusLead;
use App\src\Leads\StatusLeads\CotacaoEnviadoStatusLead;
use App\src\Leads\StatusLeads\SuperOporunidadeStatusLead;
use App\src\Leads\StatusLeads\StatusLeadsInterface;

class StatusLeads
{
    /**
     * Retorna uma sequência de classes que implementam a interface `StatusLeadsInterface`.
     *
     * @return StatusLeadsInterface[] Um array de objetos que implementam a interface `StatusLeadsInterface`.
     */
    private function sequenciaClasses(): array
    {
        return [
            (new InicioFunilStatusLead()),
            (new OportunidadeStatusLead()),
            (new SuperOporunidadeStatusLead()),
            (new ConexaoProativaStatusLead),
            (new ContatoDiretoStatusLead),
            (new CotacaoEnviadoStatusLead()),
            (new AtivoStatusLead()),
            (new FinalizadoStatusLead()),
            (new InativoStatusLead()),
        ];
    }

    public function status(): array
    {
        $classes = [];
        foreach ($this->sequenciaClasses() as $status) {
            $classes[] = [
                'id' => $status->getStatus(),
                'nome' => $status->getStatusNome()
            ];
        }
        return $classes;
    }

    public function sequenciaStatus(): array
    {
        $classes = [];
        foreach ($this->sequenciaClasses() as $status) {
            $classes[] = $status->getStatus();
        }
        return $classes;
    }

    public function sequenciaStatusDadosIndice($usuario = null): array
    {
        if (count(supervisionados(id_usuario_atual())) == 1) $usuario = id_usuario_atual();
        if ($usuario) $statusPermitidos = (new LeadsKanbanPermissoesServices())->permissoesUsuario($usuario);

        $status = [];

        foreach ($this->sequenciaClasses() as $statusDados) {
            if ($usuario) {
                if (in_array($statusDados->getStatus(), $statusPermitidos)) $status[$statusDados->getStatus()] = $statusDados->statusDados();
            } else $status[$statusDados->getStatus()] = $statusDados->statusDados();
        }

        return $status;
    }
}
