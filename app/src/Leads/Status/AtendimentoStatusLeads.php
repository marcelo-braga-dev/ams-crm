<?php

namespace App\src\Leads\Status;

use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;

/**
 * @deprecated
 */
class AtendimentoStatusLeads
{
    private string $status = 'atendimento';
    private string $cor = 'rgb(154, 205, 50)';
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
        return 'Atendimento';
    }

    public function updateStatus($id)
    {
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadStatusHistoricos())->create($id, $this->status);
    }
}
