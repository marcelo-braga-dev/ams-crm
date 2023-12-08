<?php

namespace App\Services\Excel;

use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

class ExportarExcelService
{
    public function faturamento($dados)
    {
        // Criar uma instância da classe Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $this->autoSize($sheet);

        $rowNumber = 4;
        // CATEGORIA
        foreach ($dados as $row) {

            $sheet->getStyle('A' . $rowNumber . ':' . 'B' . $rowNumber)
                ->getFont()->setBold(true);

            $sheet->mergeCells('B' . $rowNumber . ':' . 'E' . $rowNumber);
            $sheet->setCellValue('A' . $rowNumber++, 'CATEGORIA: ' . $row['categoria_nome']);

            // PRODUTOS
            foreach ($row['produtos'] as $produtos) {

                // PRODUTO
                foreach ($produtos as $produto) {
                    $datas = [];
                    $in1 = $rowNumber;
                    foreach ($produto['semanas_datas'] as $i => $semana) {
                        $datas[] = ++$i . '° SEMANA (' . $semana['inicio'] . ' até ' . $semana['fim'] . ')';
                    }

                    // ITEMS
                    $sheet->setCellValue('A' . $rowNumber, $produto['nome']);
                    $column = 'B';

                    foreach ($produto['vendas_semanas'] as $i => $vendas) {
                        $sheet->setCellValue($column . 2, $datas[$i]);
                        $columnInicio = $column;
                        $rowInicio = $rowNumber;

                        $sheet->setCellValue($column . '3', 'ESTOQUE LOCAL');
                        $sheet->setCellValue($column++ . $rowNumber, $vendas['estoque_local']);
                        $sheet->setCellValue($column . '3', 'TRANSITO');
                        $sheet->setCellValue($column++ . $rowNumber, $vendas['transito']);
                        $sheet->setCellValue($column . '3', 'VENDIDOS');
                        $sheet->setCellValue($column++ . $rowNumber, $vendas['vendas']);
                        $sheet->setCellValue($column . '3', 'TOTAL');

                        $sheet->mergeCells($columnInicio . 2 . ':' . $column . 2);

                        $sheet->getStyle($columnInicio . $rowInicio . ':' . $column . $rowNumber)
                            ->getBorders()
                            ->getOutline()
                            ->setBorderStyle(Border::BORDER_THIN);

                        $sheet->getStyle($columnInicio . 2 . ':' . $column . 4)
                            ->getBorders()
                            ->getOutline()
                            ->setBorderStyle(Border::BORDER_THIN);

                        $sheet->setCellValue($column++ . $rowNumber, $vendas['total']);
                    }
                    $sheet->getStyle('A' . $in1 . ':' . --$column . $rowNumber)
                        ->getBorders()
                        ->getOutline()
                        ->setBorderStyle(Border::BORDER_THIN);
                    $rowNumber++;
                }
            }
            $rowNumber++;
        }

        // Criar um objeto de escrita
        $writer = new Xlsx($spreadsheet);

        // Definir o caminho do arquivo para salvar
        Storage::createDirectory('excel');
        $path = 'excel/relatorio_estoque.xlsx';
        $filePath = Storage::path($path);

        // Salvar o arquivo Excel
        $writer->save($filePath);

        return asset('storage/' . $path);
    }

    private function autoSize($sheet)
    {
        $sheet->getStyle('B2:Z2')
            ->getFont()->setBold(true)->setSize(10);

        $sheet->getStyle('A3:Z3')
            ->getFont()->setBold(true)->setSize(8);

        $col = 'A';
        while ($col != 'Z') {
            $sheet->getColumnDimension($col)->setAutoSize(true);
            $col++;
        }
    }
}
