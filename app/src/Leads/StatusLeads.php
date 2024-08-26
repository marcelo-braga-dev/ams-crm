<?php

namespace App\src\Leads;

use App\src\Leads\StatusLeads\AFazerStatusLeads;
use App\src\Leads\StatusLeads\ConcluidoStatusLeads;
use App\src\Leads\StatusLeads\EmProgressoStatusLeads;
use App\src\Leads\StatusLeads\RevisaoStatusLeads;
use App\src\Leads\StatusLeads\StatusLeadsInterface;

class StatusLeads
{
    /**
     * Retorna uma sequência de classes que implementam a interface `StatusLeadsInterface`.
     *
     * @return StatusLeadsInterface[] Um array de objetos que implementam a interface `StatusLeadsInterface`.
     */
    private function sequenciaClasses()
    {
        return [
            (new AFazerStatusLeads),
            (new EmProgressoStatusLeads),
            (new RevisaoStatusLeads()),
            (new ConcluidoStatusLeads())
        ];
    }

    public function sequenciaStatus(): array
    {
        $classes = [];
        foreach ($this->sequenciaClasses() as $status) {
            $classes[] = $status->status();
        }
        return $classes;
    }

    public function sequenciaStatusDadosIndice()
    {
        $classes = [];
        foreach ($this->sequenciaClasses() as $status) {
            $classes[$status->status()] = $status->statusDados();
        }
        return $classes;
    }
}
