<?php
namespace App\src\Orcamentos\Propostas\Solmar;

use App\src\Orcamentos\Propostas\Solmar\Sessoes\Assinaturas;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Bancos;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Beneficios;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Capa;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Graficos;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Imagenskit;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\InfoKit;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\InfoPredio;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Introducao;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Portfolio;
use App\src\Orcamentos\Propostas\Solmar\Sessoes\Regulamentacao;
use Mpdf\Mpdf;
use Mpdf\MpdfException;

class Construtor extends \App\src\Orcamentos\Propostas\Solmar\DadosOrcamento
{
    public Mpdf $mpdf;
    private string $graficoGeracao;
    private string $graficoPayback;

    public function __construct(int $idOrcamento, string $graficoGeracao, string $graficoPayback)
    {
        parent::__construct($idOrcamento);

        try {
            $this->mpdf = new Mpdf([
                "format" => "A4",
                'margin_top' => 0,
                'margin_bottom' => 0,
                'margin_left' => 0,
                'margin_right' => 0
            ]);
        } catch (MpdfException $e) {
            echo $e->getMessage();
        }
        $this->graficoGeracao = $graficoGeracao;
        $this->graficoPayback = $graficoPayback;
    }

    public function gerar()
    {
        $this->config();
        $this->layout();
        $pageBreakAfter = '<div style="page-break-after: always;"></div>';

        $body = new Body();
        $this->mpdf = $body->execute(new Capa(), $this);
        $this->mpdf = $body->execute(new Introducao(), $this);
        $this->mpdf = $body->execute(new Bancos(), $this);
        $this->mpdf = $body->execute(new Beneficios(), $this);
        $this->mpdf->WriteHTML($pageBreakAfter);
        $this->mpdf = $body->execute(new InfoPredio(), $this);
        $this->mpdf = $body->execute(new InfoKit(), $this);
        $this->mpdf = $body->execute(new Imagenskit(), $this);
        $this->mpdf->WriteHTML($pageBreakAfter);
        $this->mpdf = $body->execute(new Graficos($this->graficoGeracao, $this->graficoPayback), $this);
        $this->mpdf->WriteHTML($pageBreakAfter);
        $this->mpdf = $body->execute(new Portfolio(), $this);
        $this->mpdf->WriteHTML($pageBreakAfter);
        $this->mpdf = $body->execute(new Regulamentacao(), $this);
        $this->mpdf = $body->execute(new Assinaturas(), $this);

        $orcamento = $this->getOrcamento();
        $this->mpdf->Output('ORCAMENTO', 'I');
    }

    private function config()
    {
        $config = new Config($this->mpdf);
        $this->mpdf = $config->configurar();
    }

    private function layout()
    {
        $layout = new Layout($this->mpdf);
        $this->mpdf = $layout->configurar();
    }
}
