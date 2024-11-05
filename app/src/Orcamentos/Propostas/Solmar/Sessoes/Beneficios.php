<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;

use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Beneficios implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.beneficios'));

        return $dados->mpdf;
    }
}
