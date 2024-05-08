<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class PreAtendimentoStatusLeads
{
    private string $status = 'pre_atendimento';

    public function getStatus()
    {
        return $this->status;
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
