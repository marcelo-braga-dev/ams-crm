<?php

namespace App\src\Leads;

use App\src\Leads\Status\AbertoStatusLeads;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\CanceladoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;
use App\src\Leads\Status\PreAtendimentoStatusLeads;

class UpdateStatusLeads
{
    public function setNovo($id)
    {
        (new NovoStatusLeads())->updateStatus($id);
    }

    public function setPreAtendimento($id)
    {
        (new PreAtendimentoStatusLeads())->updateStatus($id);
    }

    public function setAberto($id)
    {
        (new AbertoStatusLeads())->updateStatus($id);
    }

    public function setAtendimento($id)
    {
        (new AtendimentoStatusLeads())->updateStatus($id);
    }

    public function setAtivo($id)
    {
        (new AtivoStatusLeads())->updateStatus($id);
    }

    public function setFinalizado($id)
    {
        (new FinalizadoStatusLeads())->updateStatus($id);
    }

    /**
     * @deprecated
     */
    public function novo($id)
    {
        (new AtendimentoStatusLeads())->updateStatus($id);
    }

    /**
     * @deprecated
     */
    public function atendimento($id)
    {
        (new FinalizadoStatusLeads())->updateStatus($id);
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
