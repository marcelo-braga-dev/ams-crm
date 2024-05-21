<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class NovoStatusLeads
{
    private string $status = 'novo';

    public function getStatus()
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return 'Iniciar Atendimento';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
