<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class NovoStatusLead extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->setDescricao();
        $this->urlStatus = '';
        $this->emitePedidos = true;
    }

    public function setStatus(): void
    {
        $this->status = 'novo';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Novo';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = '#39d7db';
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
