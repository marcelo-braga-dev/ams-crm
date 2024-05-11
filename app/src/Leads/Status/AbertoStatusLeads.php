<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class AbertoStatusLeads
{
    private string $status = 'aberto';

    public function getStatus()
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return 'Aberto';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
