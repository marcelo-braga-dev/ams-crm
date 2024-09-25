<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class FinalizadosStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->urlStatus = '';
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
        (new LeadsANTIGO())->updateStatus($id, $this->status);
    }
}
