<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Services\Pedidos\StatusPedidosServices;
use Illuminate\Support\Facades\DB;

class ValoresService
{
    public function dados($mes, $ano, $setor)
    {
        $vendas = $this->vendas($mes, $ano, $setor);
        $metas = $this->metas($mes, $ano, $setor);
        $difVendasMeta = $vendas - $metas;

        return [
            'vendas' => convert_float_money($vendas),
            'meta_float' => $metas,
            'meta' => convert_float_money($metas),
            'dif_vendas_meta' => convert_float_money($difVendasMeta)
        ];
    }

    private function vendas($mes, $ano, $setor)
    {
        return (new Pedidos())->newQuery()
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->where('setor_id', $setor)
            ->whereMonth('created_at', $mes)
            ->whereYear('created_at', $ano)
            ->sum('preco_venda');
    }

    private function metas($mes, $ano)
    {
        $meses = ['1' => 'jan', '2' => 'fev', '3' => 'mar', '4' => 'abr', '5' => 'mai', '6' => 'jun', '7' => 'jul', '8' => 'ago', '9' => 'set', '10' => 'out', '11' => 'nov', '12' => 'dez'];

        return (new MetasVendas())->newQuery()
            ->where('chave', 'metas')
            ->where('ano', $ano)
            ->select(DB::raw('SUM(' . $meses[$mes] . ') as soma'))
            ->first()->soma;
    }
}
