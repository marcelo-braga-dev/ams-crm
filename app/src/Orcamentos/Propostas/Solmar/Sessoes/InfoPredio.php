<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;

use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class InfoPredio implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $orcamento = $dados->getOrcamento();
        $orcamentoKit = $dados->getOrcamentoKit();
        $metas = null;//(new OrcamentosMetas())->getMetas($orcamento->id);

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.info-predio',
            compact('orcamento', 'orcamentoKit', 'metas')));

        return $dados->mpdf;
    }

}
