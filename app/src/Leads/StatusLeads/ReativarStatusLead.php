<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class ReativarStatusLead extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->setDescricao();
        $this->urlStatus = '';
    }

    public function setStatus(): void
    {
        $this->status = 'reativar';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Super oportunidade';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'gold';
    }

    public function setStatusPrazo(): void
    {

    }

    public function setPermissoes(): void
    {

    }

    public function setDescricao(): void
    {
        $this->descricao = '';
    }

    public function updateStatus($id, $msg = null): void
    {
        (new LeadsANTIGO())->updateStatus($id, $this->status, $msg);
    }
}
