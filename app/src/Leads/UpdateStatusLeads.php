<?php

namespace App\src\Leads;

use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\CanceladoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;

class UpdateStatusLeads
{
    public function novo($id)
    {
        (new AtendimentoStatusLeads())->updateStatus($id);
    }

    public function atendimento($id)
    {
        (new FinalizadoStatusLeads())->updateStatus($id);
    }

    public function finalizado($id)
    {
        (new CanceladoStatusLeads())->updateStatus($id);
    }

    public function ocultar($id)
    {
        (new OcultosLeadsStatus())->updateStatus($id);
    }

    public function restaurar(mixed $id)
    {
        (new NovoStatusLeads())->updateStatus($id);
    }
}
