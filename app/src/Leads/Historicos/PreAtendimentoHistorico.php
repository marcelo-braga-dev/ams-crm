<?php

namespace App\src\Leads\Historicos;

class PreAtendimentoHistorico
{
    private string $status = 'pre_atendimento';

    public function status()
    {
        return $this->status;
    }

    public function msg()
    {
        return 'Pré Atendimento Iniciado';
    }
}
