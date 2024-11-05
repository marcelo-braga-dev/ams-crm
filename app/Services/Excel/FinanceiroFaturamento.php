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

    public function gerar($vendas, $pedidos)
    {
        $this->cabecalho();
        $this->vendas($vendas, $pedidos);
        $this->configStyle();

        $writer = new Xlsx($this->spreadsheet);
        Storage::createDirectory('excel');
        $path = "excel/faturamento_" . date('d_m_Y_H_i_s') . '.xlsx';
        $filePath = Storage::path($path);
        $writer->save($filePath);

        return 'storage/' . $path;
    }

    private function cabecalho()
    {
        $this->sheet->setCellValue('A1', 'ID PEDIDO');
        $this->sheet->setCellValue('B1', 'CLIENTE');
        $this->sheet->setCellValue('C1', 'DOCUMENTO');
        $this->sheet->setCellValue('D1', 'VALOR PEDIDO');
        $this->sheet->setCellValue('E1', 'PRECO CUSTO');
        $this->sheet->setCellValue('F1', 'IMPOSTO');
        $this->sheet->setCellValue('G1', 'COMISSAO');
        $this->sheet->setCellValue('H1', 'REPASSE');

        $this->sheet->setCellValue('I1', 'REPASSE DESCONTO');
        $this->sheet->setCellValue('J1', 'REPASSE TOTAL');

        $this->sheet->setCellValue('K1', 'VALOR NOTA');
        $this->sheet->setCellValue('L1', 'N NOTA FATURAMENTO');
        $this->sheet->setCellValue('M1', 'DATA');
        $this->sheet->setCellValue('N1', 'STATUS');
        $this->linhaTabelaProdutos++;
    }

    private function vendas($vendas, $pedidos)
    {
        foreach ($vendas as $venda) {
            if (in_array($venda['id'], $pedidos)){
                $this->sheet->setCellValue('A' . $this->linhaTabelaProdutos, $venda['id']);
                $this->sheet->setCellValue('B' . $this->linhaTabelaProdutos, $venda['cliente']);
                $this->sheet->setCellValue('C' . $this->linhaTabelaProdutos, $venda['cliente_documento']);
                $this->sheet->setCellValue('D' . $this->linhaTabelaProdutos, $venda['valor']);
                $this->sheet->setCellValue('E' . $this->linhaTabelaProdutos, $venda['preco_custo']);
                $this->sheet->setCellValue('F' . $this->linhaTabelaProdutos, $venda['imposto']);
                $this->sheet->setCellValue('G' . $this->linhaTabelaProdutos, $venda['lucro']);
                $this->sheet->setCellValue('H' . $this->linhaTabelaProdutos, $venda['repasse']);

                $this->sheet->setCellValue('I' . $this->linhaTabelaProdutos, $venda['repasse_desconto']);
                $this->sheet->setCellValue('J' . $this->linhaTabelaProdutos, $venda['repasse_total']);

                $this->sheet->setCellValue('K' . $this->linhaTabelaProdutos, $venda['valor_nota']);
                $this->sheet->setCellValue('L' . $this->linhaTabelaProdutos, $venda['nota_faturamento']);
                $this->sheet->setCellValue('M' . $this->linhaTabelaProdutos, $venda['data']);
                $this->sheet->setCellValue('N' . $this->linhaTabelaProdutos, $venda['status']);

                $this->convertMoney('D' . $this->linhaTabelaProdutos);
                $this->convertMoney('E' . $this->linhaTabelaProdutos);
                $this->convertMoney('G' . $this->linhaTabelaProdutos);
                $this->convertMoney('H' . $this->linhaTabelaProdutos);
                $this->convertMoney('J' . $this->linhaTabelaProdutos);
                $this->convertMoney('K' . $this->linhaTabelaProdutos);
                $this->linhaTabelaProdutos++;
            }
        }
    }

    private function configStyle(): void
    {
        $this->sheet->getStyle('A1:N1')->getAlignment()->setHorizontal('center');
        $this->sheet->getStyle('A1:N1')->getFont()->setBold(true);

        $col = 'A';
        while ($col != 'O') {
            $this->sheet->getColumnDimension($col)->setAutoSize(true);
            $col++;
        }
    }

    private function convertMoney($col)
    {
        $this->sheet->getStyle($col)->getNumberFormat()->setFormatCode('R$#,####,##0.00_-');
    }
}
