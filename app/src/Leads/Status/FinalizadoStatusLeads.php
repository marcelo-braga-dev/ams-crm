<?php

namespace App\src\Leads\Status;

use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;

/**
 * @deprecated
 */
class FinalizadoStatusLeads
{
    private string $status = 'finalizado';
    private string $cor = 'rgb(0, 0, 0)';

    public function getStatus()
    {
        return $this->status;
    }

    public function getCor()
    {
        return $this->cor;
    }

    public function getNome()
    {
        return 'Finalizado';
    }

    public function updateStatus($id)
    {
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadStatusHistoricos())->create($id, $this->status);
    }
}
