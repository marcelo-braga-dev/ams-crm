<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class AtivoStatusLeads
{
    private string $status = 'ativo';

    public function getStatus()
    {
        return $this->status;
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
