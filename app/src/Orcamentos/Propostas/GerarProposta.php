<?php

namespace App\src\Orcamentos\Propostas;

use App\src\Orcamentos\Propostas\Solmar\Construtor;

class GerarProposta
{
    public function gerar()
    {
        $gerar = (new Construtor(1, '', ''));
        $gerar->gerar();
    }
}
