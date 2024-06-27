<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;


use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Portfolio implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.portfolio'));

        return $dados->mpdf;
    }
}
