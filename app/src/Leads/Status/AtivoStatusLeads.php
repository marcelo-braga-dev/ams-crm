<?php

namespace App\src\Leads\Status;

use App\Models\Leads;
use App\Models\LeadsStatusHistoricos;

class AtivoStatusLeads
{
    private string $status = 'ativo';

    public function getStatus()
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return 'Ativo';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
