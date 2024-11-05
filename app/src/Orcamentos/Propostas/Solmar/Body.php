<?php

namespace App\src\Orcamentos\Propostas\Solmar;

use App\src\Orcamentos\Propostas\Solmar\Sessoes\Sessao;

class Body
{
    public function execute(Sessao $sessao, DadosOrcamento $dados)
    {
        return $sessao->index($dados);
    }
}
