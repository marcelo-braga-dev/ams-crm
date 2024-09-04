<?php

namespace App\src\Leads\StatusLeads;

use App\Models\Leads\Leads;

class InativoStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = 'auth.leads.avancar-status.inativos';
    }

    public function setStatus(): void
    {
        $this->status = 'inativo';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Inativos';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'gray';
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
