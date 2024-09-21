<?php

namespace App\src\Leads\Status;

use App\Models\Leads\LeadsANTIGO;
use App\Models\LeadsStatusHistoricos;

class InativoStatusLeads
{
    private string $status = 'inativo';
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
        return 'Inativo';
    }
    public function updateStatus($id)
    {
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
