<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class InativoStatusLeads extends StatusLeads
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
        (new LeadsANTIGO())->updateStatus($id, $this->status);
    }
}
