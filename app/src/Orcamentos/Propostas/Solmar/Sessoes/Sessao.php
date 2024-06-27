<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;


use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

interface Sessao
{
    public function index(DadosOrcamento $dados);
}
