<?php

namespace App\src\Leads\StatusLeads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsStatusHistoricos;

class FinalizadosStatusLeads extends StatusLeads
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

    public function setDescricao(): void
    {
        $this->descricao = '';
    }

    public function updateStatus($id, $msg = null): void
    {
        (new LeadsANTIGO())->updateStatus($id, $this->status, $msg);
    }
}
