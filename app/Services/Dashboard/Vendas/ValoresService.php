<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use Illuminate\Support\Facades\DB;

class ValoresService
{
    public function dados()
    {
        $vendas = $this->vendas();
        $metas = $this->metas();
        $difVendasMeta = $vendas - $metas;

        return [
            'vendas' => convert_float_money($vendas),
            'meta_float' => $metas,
            'meta' => convert_float_money($metas),
            'dif_vendas_meta' => convert_float_money($difVendasMeta)
        ];
    }

    private function vendas()
    {
        return (new Pedidos())->newQuery()
            ->sum('preco_venda');
    }

    private function metas()
    {
        return (new MetasVendas())->newQuery()
            ->select(DB::raw('SUM(jan + fev + mar + abr + mai + jun + jul + ago + `set` + `out` + nov + dez) as soma'))
            ->first()->soma;
    }
}
