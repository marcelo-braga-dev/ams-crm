<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class ContatoDiretoStatusLead extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->setDescricao();
        $this->urlStatus = 'auth.leads.avancar-status.progresso';
    }

    public function setStatus(): void
    {
        $this->status = 'contato_direto';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Contato Direto 360º';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'blue';
    }

    public function setStatusPrazo(): void
    {
        $this->statusPrazo = 6;
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
