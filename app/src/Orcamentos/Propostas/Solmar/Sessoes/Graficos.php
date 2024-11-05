<?php

namespace App\src\Orcamentos\Propostas\Solmar\Sessoes;


use App\src\Orcamentos\Propostas\Solmar\DadosOrcamento;

class Graficos implements Sessao
{
    private string $graficoGeracao;
    private string $graficoPayback;

    public function __construct(string $graficoGeracao, string $graficoPayback)
    {
        $this->graficoGeracao = $graficoGeracao;
        $this->graficoPayback = $graficoPayback;
    }

    public function index(DadosOrcamento $dados)
    {
        $graficoGeracao = $this->graficoGeracao;
        $graficoPayback = $this->graficoPayback;

        $dados->mpdf->WriteHTML(view('pages.pdf.solmar.sessoes.graficos',
            compact('graficoGeracao', 'graficoPayback')));

        return $dados->mpdf;
    }
}
