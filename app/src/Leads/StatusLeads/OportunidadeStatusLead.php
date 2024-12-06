<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class OportunidadeStatusLead extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->setDescricao();
        $this->urlStatus = 'auth.leads.avancar-status.novo';
    }

    public function setStatus(): void
    {
        $this->status = 'oportunidade';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Oportunidades';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = '#41D310';
    }

    public function setStatusPrazo(): void
    {
        $this->statusPrazo = 0;
    }

    public function setPermissoes(): void
    {

    }

    public function setDescricao(): void
    {
        $this->descricao = '';
    }

    public function updateStatus($id): void
    {
        (new LeadsANTIGO())->updateStatus($id, $this->status);
    }
}
