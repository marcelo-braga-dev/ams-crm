<?php

namespace App\src\Leads\Historicos;

class AtivadoHistorico
{
    private string $status = 'ativado';

    public function status()
    {
        return $this->status;
    }

    public function msg()
    {
        return 'Cliente Ativo';
    }
}
