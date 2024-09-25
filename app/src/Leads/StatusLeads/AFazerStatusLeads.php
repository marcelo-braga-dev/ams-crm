<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class AFazerStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->urlStatus = 'auth.leads.avancar-status.fazer';
    }

    public function setStatus(): void
    {
        $this->status = 'fazer';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'A Fazer';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'orange';
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
