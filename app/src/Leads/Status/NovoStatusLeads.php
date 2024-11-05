<?php

namespace App\src\Leads\Status;

use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;

/**
 * @deprecated
 */
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
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadStatusHistoricos())->create($id, $this->status);
    }
}
