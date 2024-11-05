<?php

namespace App\src\Orcamentos\Propostas\Solmar;

use Mpdf\HTMLParserMode;

class Layout
{
    private $mpdf;

    public function __construct($mpdf)
    {
        $this->mpdf = $mpdf;
    }
    public function configurar()
    {
        $this->mpdf->WriteHTML(view('pages.pdf.solmar.assets.css'), HTMLParserMode::HEADER_CSS);
        $this->mpdf->SetHTMLHeader(view('pages.pdf.solmar.template.cabecalho'));
        $this->mpdf->SetHTMLFooter(view('pages.pdf.solmar.template.rodape'));
        return $this->mpdf;
    }
}
