<?php

namespace App\src\Leads\Status;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsStatusHistoricos;

class AtivoStatusLeads
{
    private string $status = 'ativo';
    private string $cor = 'rgb(165, 42, 42)';

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
        return 'Ativo';
    }
    public function updateStatus($id)
    {
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
