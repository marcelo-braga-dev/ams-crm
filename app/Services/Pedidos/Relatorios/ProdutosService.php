<?php

namespace App\Services\Pedidos\Relatorios;

use App\Models\PedidosFaturamentos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosHistoricos;
use App\src\Produtos\ProdutosStatus;
use DateTime;

class ProdutosService
{
    public function faturamento($mes, $fornecedor, $consultor)
    {
        return (new PedidosFaturamentos())->get($mes, $fornecedor, $consultor);
    }

    public function historicos($mes, $fornecedor, $consultor)
    {
        $mes = $mes ?? date('m');

        // retorna historico de produtos
        $dados = (new ProdutosHistoricos())->get($mes, $fornecedor, $consultor);

        // popula as semanas
        $separacao = [];
        $semanas = $this->getNumerosSemanas($mes);
        foreach ($dados as $item) {
            $separacao[$item['id_produto']] = [...$item];
            $separacao[$item['id_produto']]['semanas_datas'] = $this->getDatasSemanas($mes);
            $separacao[$item['id_produto']]['semanas'] = $semanas;
        }

        // preeche quantidades
        $status = (new ProdutosStatus());

        foreach ($this->getNumerosSemanas($mes) as $i => $n) {
            $nSemana = 0;
            foreach ($dados->where('status', $status->local()) as $item) {
                if ($nSemana <= $i) {
                    $separacao[$item['id_produto']]['semanas'][$i]['estoque_local'] = $item['valor'];
                }
                $nSemana = $item['semana'];
            }

            $nSemana = 0;
            foreach ($dados->where('status', $status->transito()) as $item) {
                if ($nSemana <= $i) {
                    $separacao[$item['id_produto']]['semanas'][$i]['transito'] = $item['valor'];
                }
                $nSemana = $item['semana'];
            }
        }

        foreach ($dados->where('status', $status->venda()) as $item) {

            $separacao[$item['id_produto']]['semanas'][$item['semana']]['vendas'][] = $item['valor'];

        }


        $semanaAtual = date('W');
        foreach ($separacao as $a => $items) {
            foreach ($items['semanas'] as $b => $item) {

                if ($b > $semanaAtual)
                    $separacao[$a]['semanas'][$b] = null;
            }
        }

        // Soma Vendas
        foreach ($separacao as $a => $items) {
            foreach ($items['semanas'] as $b => $item) {
                $separacao[$a]['semanas'][$b]['vendas'] = array_sum($item['vendas'] ?? []);
            }
        }

        $res = [];
        $i = 0;
        foreach ($separacao as $item) {
            $res[$i] = [
                ...$item,
            ];
            foreach ($item['semanas'] as $semanas) {
                $total = ($semanas['estoque_local'] ?? 0) + ($semanas['transito'] ?? 0) - $semanas['vendas'];
                $res[$i]['vendas_semanas'][] = [
                    'vendas' => $semanas['vendas'],
                    'estoque_local' => $semanas['estoque_local'] ?? '',
                    'transito' => $semanas['transito'] ?? '',
                    'total' => $total != 0 ? $total : null
                ];
            }
            unset($res[$i]['semanas']);
            $i++;
        }

        $categoriasNomes = (new ProdutosCategorias())->getNomes();
        $resCategorias = [];
        foreach ($res as $index => $item) {
            $resCategorias[$item['categoria']]['categoria_nome'] = $categoriasNomes[$item['categoria']] ?? '-';
            $resCategorias[$item['categoria']]['produtos'][$index][] = ['categoria_nome' => $categoriasNomes[$item['categoria']] ?? '-', ...$item];
        }

        return [...$resCategorias];
    }

    private function getNumerosSemanas($mes): array
    {
        $semanas = [];
        for ($i = 0; $i < $this->getQtdSemanas($mes); $i++) {
            $semanas[intval(date('W', strtotime("2023-$mes-01" . ' +' . ($i * 7) . 'days')))] = [];
        }

        return $semanas;
    }

    private function getQtdSemanas($mes)
    {
        $primeiro = "2023-$mes-01";
        $ultimo = date('Y-m-t', strtotime("2023-$mes-01"));

        return intval(date('W', strtotime($ultimo))) -
            intval(date('W', strtotime($primeiro))) + 1;
    }

    public function getDatasSemanas($mes)
    {
        $semana = intval(date('W', strtotime("2023-$mes-01")));
        $d = new DateTime();
        $d->setISODate(2023, $semana);
        $inicio = $d->format('Y-m-d');

        $semanas = [];

        for ($i = 0; $i < $this->getQtdSemanas($mes); $i++) {
            $semanas[] = [
                'inicio' => date('d/m/Y', strtotime($inicio . ' +' . ($i * 7) . 'days')),
                'fim' => date('d/m/Y', strtotime($inicio . ' +' . ((($i + 1) * 7) - 1) . 'days'))
            ];
        }
        return $semanas;
    }
}
