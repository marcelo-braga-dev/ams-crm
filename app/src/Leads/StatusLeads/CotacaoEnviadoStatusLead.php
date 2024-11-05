<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;

class CotacaoEnviadoStatusLead extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->setStatusPrazo();
        $this->setDescricao();
        $this->urlStatus = 'auth.leads.avancar-status.revisao';
    }

    public function setStatus(): void
    {
        $this->status = 'cotacao_enviado';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Cotação Enviada';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'rgb(17, 92, 172)';
    }

    public function setStatusPrazo(): void
    {
        $this->statusPrazo = 10;
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
