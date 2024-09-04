<?php

namespace App\src\Leads\Status;

use App\Models\Leads\Leads;
use App\Models\LeadsStatusHistoricos;

class InativoStatusLeads
{
    private string $status = 'inativo';
    private string $cor = '#aaa';

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
        return 'Inativo';
    }
    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
