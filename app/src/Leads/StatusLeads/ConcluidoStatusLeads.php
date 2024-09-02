<?php

namespace App\src\Leads\StatusLeads;

use App\Models\Leads;

class ConcluidoStatusLeads extends StatusLeads
{
    public function __construct()
    {
        $this->setStatus();
        $this->setStatusNome();
        $this->setStatusCor();
        $this->urlStatus = 'auth.leads.show';
    }

    public function setStatus(): void
    {
        $this->status = 'concluido';
    }

    public function setStatusNome(): void
    {
        $this->statusNome = 'Concluído';
    }

    public function setStatusCor(): void
    {
        $this->statusCor = 'green';
    }

    public function setStatusPrazo(): void
    {

    }

    public function setPermissoes(): void
    {

    }

    public function updateStatus($id): void
    {
        (new Leads())->updateStatus($id, $this->status);
    }
}
