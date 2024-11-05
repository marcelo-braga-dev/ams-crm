<?php

namespace App\Services\Excel;

use App\Models\Pedidos;
use App\Models\PedidosProdutos;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class VendasUsuario
{
    private Worksheet $sheet;
    private Spreadsheet $spreadsheet;
    private int $linhaTabelaProdutos = 1;

    public function __construct()
    {
        $this->spreadsheet = new Spreadsheet();
        $this->sheet = $this->spreadsheet->getActiveSheet();
    }

    public function gerar($usuario, $vendas)
    {
        $this->cabecalho();
        $this->vendas($vendas, $usuario['nome']);
        $this->configStyle();

        $writer = new Xlsx($this->spreadsheet);
        Storage::createDirectory('excel');
        $path = "excel/vendas_" . date('d_m_Y_H_i_s') . '.xlsx';
        $filePath = Storage::path($path);
        $writer->save($filePath);

        return asset('storage/' . $path);
    }

    private function cabecalho()
    {
        $this->sheet->setCellValue('A1', 'ID PEDIDO');
        $this->sheet->setCellValue('B1', 'Valor');
        $this->sheet->setCellValue('C1', 'Cliente');
        $this->sheet->setCellValue('D1', 'Integrador');
        $this->sheet->setCellValue('E1', 'Data');
        $this->sheet->setCellValue('F1', 'Status');
        $this->sheet->setCellValue('G1', 'Consultor');
        $this->linhaTabelaProdutos++;
    }

    private function vendas($vendas, $colsultor)
    {
        foreach ($vendas as $venda) {
            $this->sheet->setCellValue('A' . $this->linhaTabelaProdutos, $venda['id']);
            $this->sheet->setCellValue('B' . $this->linhaTabelaProdutos, $venda['valor']);
            $this->sheet->setCellValue('C' . $this->linhaTabelaProdutos, $venda['cliente']);
            $this->sheet->setCellValue('D' . $this->linhaTabelaProdutos, $venda['lead']);
            $this->sheet->setCellValue('E' . $this->linhaTabelaProdutos, $venda['data']);
            $this->sheet->setCellValue('F' . $this->linhaTabelaProdutos, $venda['status']);
            $this->sheet->setCellValue('G' . $this->linhaTabelaProdutos, $colsultor);

            $this->convertMoney('B' . $this->linhaTabelaProdutos);
            $this->linhaTabelaProdutos++;
        }
    }

    private function configStyle(): void
    {
        $this->sheet->getStyle('A1:G1')->getAlignment()->setHorizontal('center');
        $this->sheet->getStyle('A1:G1')->getFont()->setBold(true);

        $col = 'A';
        while ($col != 'H') {
            $this->sheet->getColumnDimension($col)->setAutoSize(true);
            $col++;
        }
    }

    private function convertMoney($col)
    {
        $this->sheet->getStyle($col)->getNumberFormat()->setFormatCode('R$#,####,##0.00_-');
    }
}
