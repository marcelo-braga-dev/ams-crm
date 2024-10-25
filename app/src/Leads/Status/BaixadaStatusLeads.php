<?php

namespace App\src\Leads\Status;

use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;

/**
 * @deprecated
 */
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
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadStatusHistoricos())->create($id, $this->status);
    }
}
