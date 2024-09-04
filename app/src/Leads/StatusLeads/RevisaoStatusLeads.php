<?php

namespace App\src\Leads\StatusLeads;

use App\Models\Leads\Leads;

class RevisaoStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = 'auth.leads.avancar-status.revisao';
    }

    public function setStatus(): void
    {
        $this->status = 'revisao';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Revisão';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'red';
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
