<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\Pedidos;
use Illuminate\Support\Facades\DB;

class VendasMensaisService
{
    public function vendas($meta, $ano)
    {
        $items = (new Pedidos())->newQuery()
            ->whereYear('created_at', $ano)
            ->select(
                DB::raw('MONTH(created_at) as mes'),
                DB::raw('SUM(preco_venda) as vendas')
            )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->mes] = [
                'valor' => $item['vendas'],
                'money' => convert_float_money($item['vendas']),
                'meta' => convert_float_money($meta / 6 ),
                'diferenca' => convert_float_money($item['vendas'] - ($meta / 6)),
            ];
        }
        return $dados;
    }
}
