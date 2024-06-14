<?php

namespace App\src\Leads\Status;

use App\Models\Leads;
use App\Models\LeadsStatusHistoricos;

class AbertoStatusLeads
{
    private string $status = 'aberto';
    private string $cor = 'rgb(0, 128, 0)';

    public function getStatus()
    {
        return $this->status;
    }

    public function getCor()
    {
        return $this->cor;
    }

    public function getNome(): string
    {
        return 'Aberto';
    }

    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
