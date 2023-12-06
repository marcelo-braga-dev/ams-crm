<?php

namespace App\Services\Excel;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ExportarExcelService
{
    public function faturamento($dados)
    {
        // Criar uma instância da classe Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Preencher a planilha com os dados do banco de dados
        $rowNumber = 1;
        foreach ($dados as $row) {
            $column = 'A';
            foreach ($row as $value) {
                $sheet->setCellValue($column . $rowNumber, $value);
                $column++;
            }
            $rowNumber++;
        }

        // Criar um objeto de escrita
        $writer = new Xlsx($spreadsheet);

        // Definir o caminho do arquivo para salvar
        $filePath = storage_path('app/public/database_data.xlsx');

        // Salvar o arquivo Excel
        $writer->save($filePath);

        return "O arquivo Excel foi gerado com sucesso em: $filePath";
    }
}
