<?php

namespace App\src\Leads\Status;

use App\Models\Leads;
use App\Models\LeadsStatusHistoricos;

class FinalizadoStatusLeads
{
    private string $status = 'finalizado';
    private string $cor = 'rgb(0, 0, 0)';

    public function getStatus()
    {
        return $this->status;
    }

    public function getCor()
    {
        return $this->cor;
    }

    public function getNome()
    {
        return 'Finalizado';
    }

    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
