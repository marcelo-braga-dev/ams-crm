<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;


use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class InfoKit implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $kit = $dados->getKit();
        $orcamento = $dados->getOrcamento();
        $orcamentoKit = $dados->getOrcamentoKit();

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.info-kit',
            compact('kit', 'orcamento', 'orcamentoKit')));

        return $dados->mpdf;
    }
}
