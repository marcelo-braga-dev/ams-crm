<?php

namespace App\Services\Pedidos\Relatorios;

use App\Models\ProdutosHistoricos;
use DateTime;

class ProdutosRelatoriosService
{
    public function relatorio($mes, $consultor, $fornecedor)
    {
        $mes = $mes ?? date('m');

        $historicos = (new ProdutosHistoricos())->relatorio($mes, $consultor, $fornecedor);

        $estoquesLocal = $historicos->where('status', 'estoque_local');

        $semanas = $this->getDatasSemanas($mes);
        print_pre($semanas, 'SEMANAS');

        $produtos = [];
        foreach ($estoquesLocal as $item) {
            $produtos[$item['id_produto']][] = $item;
        }
        print_pre($produtos);

    }

    private function getDatasSemanas($mes)
    {
        $qtd = $this->getQtdSemanas($mes);

        $semanas = [];

        for ($i = 0; $i < $qtd; $i++) {
            $semanas[] = [
                'inicio' => date('d/m/y', strtotime("2023-$mes-01" . ' +' . ($i * 7) . 'days')),
                'fim' => ($i + 1) == $qtd ?
                    date('t/m/y', strtotime("2023-$mes-01")) :
                    date('d/m/y', strtotime("2023-$mes-01" . ' +' . ((($i + 1) * 7) - 1) . 'days'))

            ];
        }

        return $semanas;
    }

    private function getQtdSemanas($mes)
    {
        $ano = 2023;
        $semana = 48;
        $d = new DateTime();
        $d->setISODate($ano, $semana);
        $inicio = $d->format('Y-m-d');

        $dias = [];
        $dias[$semana] = date('d/m/Y', strtotime($inicio));
        $dias[] = date('d/m/Y', strtotime($inicio . ' +' . 7 . 'days'));
        $dias[] = date('d/m/Y', strtotime($inicio . ' +' . 14 . 'days'));
        $dias[] = date('d/m/Y', strtotime($inicio . ' +' . 21 . 'days'));
        $dias[] = date('d/m/Y', strtotime($inicio . ' +' . 28 . 'days'));

        print_pre($dias);

        $mes = 12;
        $primeiro = "2023-$mes-01";
        $ultimo = date('Y-m-t', strtotime("2023-$mes-01"));
        print_pre(intval(date('W', strtotime($ultimo))));
        return (intval(date('W', strtotime($ultimo)))) -
            (intval(date('W', strtotime($primeiro))));
    }
}
