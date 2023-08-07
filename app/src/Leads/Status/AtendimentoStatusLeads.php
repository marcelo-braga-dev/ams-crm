<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class AtendimentoStatusLeads
{
    private string $status = 'atendimento';
    public function getStatus()
    {
        return $this->status;
    }

    public function getNome()
    {
        return 'Enviado para Atendimento';
    }

    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
