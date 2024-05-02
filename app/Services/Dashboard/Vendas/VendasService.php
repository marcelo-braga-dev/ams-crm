<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\User;
use App\Services\Pedidos\StatusPedidosServices;
use Illuminate\Support\Facades\DB;

class VendasService
{
    public function metaVendas($mes, $ano, $setor): array
    {
        $usuarios = (new User())->getUsuarios($setor, false);
        $isAdmin = is_admin();

        $vendasUsuarios = [];
        $totalVendas = 0;
        $totalMetas = 0;
        $totalCustos = 0;
        $totalQtd = 0;

        foreach ($usuarios as $usuario) {
            $vendas = 0;
            $metas = 0;
            $custos = 0;
            $qtd = 0;

            if (is_array($mes))
                foreach ($mes as $item) {
                    $vendas += (new Pedidos())->getVendasMesUsuario($usuario['id'], $item, $ano)->vendas;
                    $custos += (new Pedidos())->getVendasMesUsuario($usuario['id'], $item, $ano)->custos;
                    $qtd += (new Pedidos())->getVendasMesUsuario($usuario['id'], $item, $ano)->qtd;
                    $metas += (new MetasVendas())->getMetaMes($usuario['id'], $item, $ano);
                }
            else {
                $vendas = (new Pedidos())->getVendasMesUsuario($usuario['id'], $mes, $ano)->vendas;
                $custos = (new Pedidos())->getVendasMesUsuario($usuario['id'], $mes, $ano)->custos;
                $qtd = (new Pedidos())->getVendasMesUsuario($usuario['id'], $mes, $ano)->qtd;
                $metas = (new MetasVendas())->getMetaMes($usuario['id'], $mes, $ano);
            }

            if ($usuario['status'] == 'ativo' || $qtd > 0) {
                $totalMetas += $metas;

                $totalVendas += $vendas;
                $totalCustos += $custos;
                $totalQtd += $qtd;

                $vendasUsuarios[] = [
                    'vendas' => $vendas,
                    'custos' => $isAdmin ? $custos : null,
                    'lucro' => $isAdmin ? ($vendas - $custos) : null,
                    'qtd' => $qtd,
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    'meta' => $metas
                ];
            }
        }
        rsort($vendasUsuarios);

        return [
            'vendas' => $vendasUsuarios, 'totalVendas' => $totalVendas, 'totalMetas' => $totalMetas, 'totalCustos' => $isAdmin ? $totalCustos : null,
            'totalQtd' => $totalQtd
        ];
    }

    public function metaVendasAnual($ano, $setor): array
    {
        $meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $nomeMes = [1 => 'jan', 2 => 'fev', 3 => 'mar', 4 => 'abr', 5 => 'mai', 6 => 'jun', 7 => 'jul', 8 => 'ago', 9 => 'set', 10 => 'out', 11 => 'nov', 12 => 'dez'];

        $somaVendas = 0;
        $somaMetas = 0;

        $dados = [];
        foreach ($meses as $mes) {
            $item = $this->metaVendas($mes, $ano, $setor);
            $somaVendas += $item['totalVendas'];
            $somaMetas += $item['totalMetas'];
            $dados[] = ['mes' => $nomeMes[$mes], 'total_vendas' => $item['totalVendas'], 'total_metas' => $item['totalMetas']];
        }

        $dados[] = ['mes' => "total", 'total_vendas' => $somaVendas, 'total_metas' => $somaMetas];

        return $dados;
    }

    public function vendasPorEstados($mes, $ano, $setor)
    {
        return (new Pedidos())->newQuery()
            ->leftJoin('pedidos_clientes', 'pedidos.id', '=', 'pedidos_clientes.pedido_id')
            ->leftJoin('enderecos', 'pedidos_clientes.endereco', '=', 'enderecos.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusFaturados())
            ->whereMonth('pedidos.data_faturamento', $mes)
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
                count(pedidos.id) as qtd,
                enderecos.estado as estado
                '))
            ->groupBy('enderecos.estado')
            ->orderByDesc('qtd')
            ->get();
    }
}
