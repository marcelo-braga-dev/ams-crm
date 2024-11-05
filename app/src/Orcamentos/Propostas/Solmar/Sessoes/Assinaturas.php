<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;


use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Assinaturas implements Sessao
{
    public function index(DadosOrcamento $dados)
    {
        $cliente = $dados->getCliente();
        $dadosCliente = $dados->getDadosCliente();

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.assinaturas',
            compact('cliente', 'dadosCliente')));

        return $dados->mpdf;
    }
}
