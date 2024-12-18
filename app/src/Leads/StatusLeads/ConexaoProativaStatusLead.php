<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class ConexaoProativaStatusLead extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->setDescricao();
        $this->urlStatus = 'auth.leads.avancar-status.fazer';
    }

    public function setStatus(): void
    {
        $this->status = 'conexao_proativo';
    }

    public function setStatusPrazo(): void
    {
        $this->statusPrazo = 7;
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Conexão Proativa';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'orange';
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
