<?php

namespace App\Services\Pedidos;

use App\Models\Pedidos;
use App\Models\PedidosProdutos;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PlanilhaProdutos
{
    private Worksheet $sheet;
    private Spreadsheet $spreadsheet;
    private int $linhaTabelaProdutos = 1;

    public function __construct()
    {
        $this->spreadsheet = new Spreadsheet();
        $this->sheet = $this->spreadsheet->getActiveSheet();
    }

    public function gerar($inicio, $fim, $setor)
    {
        $pedidos = (new Pedidos())->pedidosPeriodo($inicio, $fim, $setor = 3);

        $this->cabecalho();
        $items = $this->produtos($pedidos);
        $this->configStyle();

        $writer = new Xlsx($this->spreadsheet);
        Storage::createDirectory('excel');
        $path = "excel/pedido_" . date('d_m_Y_H_i_s') . '.xlsx';
        $filePath = Storage::path($path);
        $writer->save($filePath);

        return ['url' => asset('storage/' . $path), 'pedidos' => $items];
    }

    private function cabecalho()
    {
        $this->sheet->setCellValue('A1', 'ID PEDIDO');
        $this->sheet->setCellValue('B1', 'CLIENTE');
        $this->sheet->setCellValue('C1', 'TELEFONE');
        $this->sheet->setCellValue('D1', 'CIDADE');
        $this->sheet->setCellValue('E1', 'PRODUTO');
        $this->sheet->setCellValue('F1', 'UND');
        $this->sheet->setCellValue('G1', 'QTD');
        $this->sheet->setCellValue('H1', 'PREÇO UND');
        $this->sheet->setCellValue('I1', 'TOTAL');
        $this->sheet->setCellValue('J1', 'DATA');
        $this->linhaTabelaProdutos++;
    }

    private function produtos($pedidos)
    {
        $res = [];
        foreach ($pedidos as $pedido) {
            $id = $pedido['pedido']['id'];
            $produtos = (new PedidosProdutos())->getProdutosPedido($id);

            foreach ($produtos as $item) {
                $this->sheet->setCellValue('A' . $this->linhaTabelaProdutos, $id);
                $this->sheet->setCellValue('B' . $this->linhaTabelaProdutos, $pedido['cliente']['nome'] . ' [#' . $pedido['cliente']['id'] . ']');
                $this->sheet->setCellValue('C' . $this->linhaTabelaProdutos, $pedido['cliente']['telefone']);
                $this->sheet->setCellValue('D' . $this->linhaTabelaProdutos, $pedido['cliente']['cidade'] . '/' . $pedido['cliente']['estado']);
                $this->sheet->setCellValue('E' . $this->linhaTabelaProdutos, $item['nome']);
                $this->sheet->setCellValue('F' . $this->linhaTabelaProdutos, $item['unidade']);
                $this->sheet->setCellValue('G' . $this->linhaTabelaProdutos, $item['qtd']);
                $this->sheet->setCellValue('H' . $this->linhaTabelaProdutos, $item['preco_venda_float']);
                $this->sheet->setCellValue('I' . $this->linhaTabelaProdutos, $item['qtd'] * $item['preco_venda_float']);
                $this->sheet->setCellValue('J' . $this->linhaTabelaProdutos, $pedido['pedido']['data_criacao']);

                $this->convertMoney('H' . $this->linhaTabelaProdutos);
                $this->convertMoney('I' . $this->linhaTabelaProdutos);
                if ($item['nome']) $this->linhaTabelaProdutos++;

                $res[] = [
                    'id' => '#' . $id,
                    'nome' => $pedido['cliente']['nome'] . ' [#' . $pedido['cliente']['id'] . ']',
                    'telefone' => $pedido['cliente']['telefone'],
                    'localidade' => $pedido['cliente']['cidade'] . ($pedido['cliente']['estado'] ? '/' . $pedido['cliente']['estado'] : ''),
                    'produto' => $item['nome'],
                    'und' => $item['unidade'],
                    'qtd' => $item['qtd'],
                    'preco' => convert_float_money($item['preco_venda_float']),
                    'total' => convert_float_money($item['qtd'] * $item['preco_venda_float']),
                    'data' => $pedido['pedido']['data_criacao'],
                ];
            }
        }
        return $res;
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

    private function convertMoney($col)
    {
        $this->sheet->getStyle($col)->getNumberFormat()->setFormatCode('R$#,####,##0.00_-');
    }
}
