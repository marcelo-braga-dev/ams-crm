<?php

namespace App\src\Leads\Status;

use App\Models\Leads;
use App\Models\LeadsStatusHistoricos;

class PreAtendimentoStatusLeads
{
    private string $status = 'pre_atendimento';

    public function getStatus()
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return 'Pré-Atendimento';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
