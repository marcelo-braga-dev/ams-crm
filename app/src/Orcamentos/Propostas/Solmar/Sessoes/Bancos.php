<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;

use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Bancos implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $bancos = null;
        $orcamento = $dados->getOrcamento();

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.bancos',
            compact('bancos', 'orcamento')));

        return $dados->mpdf;
    }
}
