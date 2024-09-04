<?php

namespace App\src\Leads\Status;

use App\Models\Leads\Leads;
use App\Models\LeadsStatusHistoricos;

class NovoStatusLeads
{
    private string $status = 'novo';
    private string $cor = 'rgb(0, 0, 255)';

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
        return 'Novo';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
