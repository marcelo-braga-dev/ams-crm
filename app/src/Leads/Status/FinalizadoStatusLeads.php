<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class FinalizadoStatusLeads
{
    private string $status = 'finalizado';

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
