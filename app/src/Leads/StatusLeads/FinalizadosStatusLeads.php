<?php

namespace App\src\Leads\StatusLeads;

use App\Models\Leads\Leads;

class FinalizadosStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = 'auth.leads.avancar-status.finalizados';
    }

    public function setStatus(): void
    {
        $this->status = 'finalizado';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Finalizados';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'black';
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
