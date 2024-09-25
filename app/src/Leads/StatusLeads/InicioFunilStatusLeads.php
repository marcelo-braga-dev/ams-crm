<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class InicioFunilStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = '';
    }

    public function setStatus(): void
    {
        $this->status = 'inicio_funil';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Inicio Funil';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'purple';
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
