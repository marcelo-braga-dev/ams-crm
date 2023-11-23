<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use Illuminate\Support\Facades\DB;

class EconomicosService
{
    public function lucros()
    {
        $nomes = (new User())->getNomes();

        $vendas = (new Pedidos())->newQuery()
            ->where('status', '!=', (new RevisarStatusPedido())->getStatus())
            ->where('status', '!=', (new CanceladoStatus())->getStatus())
            ->select(
                'users_id',
                'setor',
                DB::raw('SUM(preco_venda) as vendas, SUM(preco_custo) as custo, MONTH(status_data) as mes'))
            ->groupBy(DB::raw('MONTH(status_data)'))
            ->orderBy('mes')
            ->get();

        $vendasTotal = 0;
        $custoTotal = 0;
        $lucroTotal = 0;
        $margemLucroTotal = 0;
        $crescimentoTotal = 0;

        $meses = [];
        foreach ($vendas as $item) {
            $vendasTotal += $item->vendas;
            $custoTotal += $item->custo;
            $lucroTotal += $item->vendas - $item->custo;

            $margemVendasLucro = ($item->vendas - $item->custo) / ($item->vendas ?? 1) * 100;
            $crescimento = ($meses[($item->mes - 1)] ?? null) ? $margemVendasLucro - ($meses[($item->mes - 1)]['margem_vendas_lucro'] ?? 0) : 0;

            $margemLucroTotal += $margemVendasLucro;
            $crescimentoTotal += $crescimento;

            $meses[$item->mes] = [
                'nome' => $nomes[$item->users_id],
                'vendas' => $item->vendas,
                'vendas_money' => convert_float_money($item->vendas),
                'custo' => $item->custo,
                'custo_money' => convert_float_money($item->custo),
                'lucro' => $item->vendas - $item->custo,
                'lucro_money' => convert_float_money($item->vendas - $item->custo),
                'margem_vendas_lucro' => $margemVendasLucro,
                'margem_vendas_lucro_money' => convert_float_money($margemVendasLucro),
                'crescimento_margem_money' => convert_float_money($crescimento)
            ];
        }
        $meses['vendas_total'] = convert_float_money($vendasTotal);
        $meses['lucro_total'] = convert_float_money($lucroTotal);
        $meses['custo_total'] = convert_float_money($custoTotal);
        $meses['margem_lucro_total'] = convert_float_money($margemLucroTotal / (count($vendas) > 0 ?: 1));
        $meses['crescimento_total'] = convert_float_money($crescimentoTotal / (count($vendas) > 0 ?: 1));
//        print_pre($meses);
        return $meses;
    }
}
