<?php

namespace App\src\Leads\StatusLeads;

use App\Models\Leads\Leads;

class EmProgressoStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = 'auth.leads.avancar-status.progresso';
    }

    public function setStatus(): void
    {
        $this->status = 'progresso';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Em Progresso';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'blue';
    }

    public function setStatusPrazo(): void
    {

    }

    public function setPermissoes(): void
    {

    }

    public function updateStatus($id): void
    {
        (new Leads())->updateStatus($id, $this->status);
    }
}
