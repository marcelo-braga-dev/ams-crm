<?php

namespace App\src\Leads\Status;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsStatusHistoricos;

class OcultosLeadsStatus
{
    private string $status = 'oculto';

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return '';
    }
    public function updateStatus($id): void
    {
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
