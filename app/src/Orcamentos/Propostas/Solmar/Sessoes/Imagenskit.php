<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;

use App\Models\Kits;
use App\Models\Produtos;
use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Imagenskit implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $kit = $dados->getKit();
        $imagens = null;//(new Produtos())->getDados();
        $orcamentoKit = $dados->getOrcamentoKit();
        $trafo = $dados->getTrafo();

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.imagens-kit',
            compact('imagens', 'kit', 'orcamentoKit', 'trafo')));

        return $dados->mpdf;
    }
}
