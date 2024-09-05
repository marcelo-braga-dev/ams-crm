<?php

namespace App\src\Leads\Status;

use App\Models\Leads\Leads;
use App\Models\LeadsStatusHistoricos;

class BaixadaStatusLeads
{
    private string $status = 'baixada';
    private string $cor = 'red';

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
        return 'Baixada';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
