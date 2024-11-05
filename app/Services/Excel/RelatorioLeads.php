<?php

namespace App\Services\Excel;

use App\Models\Pedidos;
use App\Models\PedidosProdutos;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class RelatorioLeads
{
    private Worksheet $sheet;
    private Spreadsheet $spreadsheet;
    private int $linhaTabelaProdutos = 1;

    public function __construct()
    {
        $this->spreadsheet = new Spreadsheet();
        $this->sheet = $this->spreadsheet->getActiveSheet();
    }

    public function gerar($dados)
    {
        $this->cabecalho();
        $this->linhas($dados);
        $this->configStyle();

        $writer = new Xlsx($this->spreadsheet);
        Storage::createDirectory('excel');
        $path = "excel/leads_relatorio_" . date('d_m_Y_H_i_s') . '.xlsx';
        $filePath = Storage::path($path);
        $writer->save($filePath);

        return asset('storage/' . $path);
    }

    private function cabecalho()
    {
        $this->sheet->setCellValue('A1', 'ID LEAD');
        $this->sheet->setCellValue('B1', 'NOME');
        $this->sheet->setCellValue('C1', 'RAZAO SOCIAL');
        $this->sheet->setCellValue('D1', 'CNPJ');
        $this->sheet->setCellValue('E1', 'CPF');
        $this->sheet->setCellValue('F1', 'CONSULTOR(A)');
        $this->sheet->setCellValue('G1', 'ÚLTIMO PEDIDO');
        $this->sheet->setCellValue('H1', 'QTD VENDAS');
        $this->sheet->setCellValue('I1', 'TOTAL VENDAS');
        $this->sheet->setCellValue('J1', 'TELEFONE');
        $this->linhaTabelaProdutos++;
    }

    private function linhas($dados)
    {
        foreach ($dados as $item) {
            $this->sheet->setCellValue('A' . $this->linhaTabelaProdutos, $item['lead_id']);
            $this->sheet->setCellValue('B' . $this->linhaTabelaProdutos, $item['lead_nome']);
            $this->sheet->setCellValue('C' . $this->linhaTabelaProdutos, $item['razao_social']);
            $this->sheet->setCellValue('D' . $this->linhaTabelaProdutos, $item['cnpj']);
            $this->sheet->setCellValue('E' . $this->linhaTabelaProdutos, $item['cpf']);
            $this->sheet->setCellValue('F' . $this->linhaTabelaProdutos, $item['consultor_nome']);
            $this->sheet->setCellValue('G' . $this->linhaTabelaProdutos, $item['pedido_data']);
            $this->sheet->setCellValue('H' . $this->linhaTabelaProdutos, $item['pedidos_qtd']);
            $this->sheet->setCellValue('I' . $this->linhaTabelaProdutos, $item['pedidos_vendas']);
            $this->sheet->setCellValue('J' . $this->linhaTabelaProdutos, $item['telefone']);

            $this->convertMoney('I' . $this->linhaTabelaProdutos);

            if ($item['lead_id']) $this->linhaTabelaProdutos++;
        }
    }

    private function convertMoney($col)
    {
        $this->sheet->getStyle($col)->getNumberFormat()->setFormatCode('R$#,####,##0.00_-');
    }

    private function configStyle(): void
    {
        $this->sheet->getStyle('A1:J1')->getAlignment()->setHorizontal('center');
        $this->sheet->getStyle('A1:J1')->getFont()->setBold(true);

        $col = 'A';
        while ($col != 'K') {
            $this->sheet->getColumnDimension($col)->setAutoSize(true);
            $col++;
        }
    }
}
