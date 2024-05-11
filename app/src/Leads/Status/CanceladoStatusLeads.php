<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class CanceladoStatusLeads
{
    private string $status = 'atendimento';
    public function getStatus()
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return '';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
