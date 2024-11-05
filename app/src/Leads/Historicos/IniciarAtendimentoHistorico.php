<?php

namespace App\src\Leads\Historicos;

class IniciarAtendimentoHistorico
{
    private string $status = 'iniciar_atendimento';

    public function status()
    {
        return $this->status;
    }

    public function msg()
    {
        return 'Atendimento Iniciado';
    }
}
