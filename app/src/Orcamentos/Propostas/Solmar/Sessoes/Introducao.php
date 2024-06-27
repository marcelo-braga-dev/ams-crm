<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;


use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Introducao implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $cliente = $dados->getCliente();
        $vendedor = $dados->getVendedor();
        $orcamento = $dados->getOrcamento();

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.introducao',
            compact('cliente', 'vendedor', 'orcamento')));

        return $dados->mpdf;
    }
}
