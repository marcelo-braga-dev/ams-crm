<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class ConcluidoStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->urlStatus = 'auth.leads.avancar-status.concluido';
        $this->emitePedidos = true;
    }

    public function setStatus(): void
    {
        $this->status = 'concluido';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Concluído';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'green';
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
