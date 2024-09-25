<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class NovoStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = 'auth.leads.avancar-status.novo';
    }

    public function setStatus(): void
    {
        $this->status = 'novo';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Novos';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = '#41D310';
    }

    public function setStatusPrazo(): void
    {

    }

    public function setPermissoes(): void
    {

    }

    public function updateStatus($id): void
    {
        (new LeadsANTIGO())->updateStatus($id, $this->status);
    }
}
