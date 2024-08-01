<?php

namespace App\Services\Excel;

use App\Models\PedidosFaturados;
use App\Models\PedidosFaturadosPlanilhas;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class FinanceiroFaturamento
{
    private Worksheet $sheet;
    private Spreadsheet $spreadsheet;
    private int $linhaTabelaProdutos = 1;

    public function __construct()
    {
        $this->spreadsheet = new Spreadsheet();
        $this->sheet = $this->spreadsheet->getActiveSheet();
    }

    public function gerar($vendas)
    {
        $this->cabecalho();
        $this->vendas($vendas);
        $this->configStyle();

        $writer = new Xlsx($this->spreadsheet);
        Storage::createDirectory('excel');
        $path = "excel/faturamento_" . date('d_m_Y_H_i_s') . '.xlsx';
        $filePath = Storage::path($path);
        $writer->save($filePath);

        $idExportacao = (new PedidosFaturadosPlanilhas())->create('storage/' . $path);
        (new PedidosFaturados())->createPlanilha($idExportacao, $vendas);
    }

    private function cabecalho()
    {
        $this->sheet->setCellValue('A1', 'ID PEDIDO');
        $this->sheet->setCellValue('B1', 'CLIENTE');
        $this->sheet->setCellValue('C1', 'DOCUMENTO');
        $this->sheet->setCellValue('D1', 'PRECO');
        $this->sheet->setCellValue('E1', 'PRECO CUSTO');
        $this->sheet->setCellValue('F1', 'IMPOSTO');
        $this->sheet->setCellValue('G1', 'COMISSAO');
        $this->sheet->setCellValue('H1', 'REPASSE');
        $this->sheet->setCellValue('I1', 'VALOR NOTA');
        $this->sheet->setCellValue('J1', 'INTEGRADOR');
        $this->sheet->setCellValue('K1', 'DATA');
        $this->sheet->setCellValue('L1', 'STATUS');
        $this->sheet->setCellValue('M1', 'CONSULTOR');
        $this->linhaTabelaProdutos++;
    }

    private function vendas($vendas)
    {
        foreach ($vendas as $venda) {
            $this->sheet->setCellValue('A' . $this->linhaTabelaProdutos, $venda['id']);
            $this->sheet->setCellValue('B' . $this->linhaTabelaProdutos, $venda['cliente']);
            $this->sheet->setCellValue('C' . $this->linhaTabelaProdutos, $venda['cliente_documento']);
            $this->sheet->setCellValue('D' . $this->linhaTabelaProdutos, $venda['valor']);
            $this->sheet->setCellValue('E' . $this->linhaTabelaProdutos, $venda['preco_custo']);
            $this->sheet->setCellValue('F' . $this->linhaTabelaProdutos, $venda['imposto']);
            $this->sheet->setCellValue('G' . $this->linhaTabelaProdutos, $venda['lucro']);
            $this->sheet->setCellValue('H' . $this->linhaTabelaProdutos, $venda['repasse']);
            $this->sheet->setCellValue('I' . $this->linhaTabelaProdutos, $venda['valor_nota']);
            $this->sheet->setCellValue('J' . $this->linhaTabelaProdutos, $venda['lead']);
            $this->sheet->setCellValue('K' . $this->linhaTabelaProdutos, $venda['data']);
            $this->sheet->setCellValue('L' . $this->linhaTabelaProdutos, $venda['status']);
            $this->sheet->setCellValue('M' . $this->linhaTabelaProdutos, $venda['consultor_nome']);

            $this->convertMoney('D' . $this->linhaTabelaProdutos);
            $this->convertMoney('E' . $this->linhaTabelaProdutos);
            $this->convertMoney('G' . $this->linhaTabelaProdutos);
            $this->convertMoney('H' . $this->linhaTabelaProdutos);
            $this->convertMoney('I' . $this->linhaTabelaProdutos);
            $this->linhaTabelaProdutos++;
        }
    }

    private function configStyle(): void
    {
        $this->sheet->getStyle('A1:M1')->getAlignment()->setHorizontal('center');
        $this->sheet->getStyle('A1:M1')->getFont()->setBold(true);

        $col = 'A';
        while ($col != 'N') {
            $this->sheet->getColumnDimension($col)->setAutoSize(true);
            $col++;
        }
    }

    private function convertMoney($col)
    {
        $this->sheet->getStyle($col)->getNumberFormat()->setFormatCode('R$#,####,##0.00_-');
    }
}
