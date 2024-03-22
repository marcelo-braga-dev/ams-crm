<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use Illuminate\Support\Facades\DB;

class VendasService
{
    public function metaVendas($mes, $ano)
    {
        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNomes();
        $metas = (new MetasVendas())->metas();

        $items = (new Pedidos())->newQuery()
            ->whereIn('status', (new StatusPedidosServices())->statusFaturados())
            ->whereMonth('created_at', $mes)
            ->whereYear('created_at', $ano)
            ->where('status', '!=', (new RevisarStatusPedido())->getStatus())
            ->where('status', '!=', (new CanceladoStatus())->getStatus())
            ->select(
                'user_id',
                'setor_id',
                DB::raw('SUM(preco_venda) as vendas'))
            ->groupBy('user_id')
            ->get()
            ->transform(function ($item) use ($nomes, $setores, $metas) {
                if ($nomes[$item->user_id] ?? null)
                    return [
                        'nome' => $nomes[$item->user_id],
                        'vendas' => $item->vendas,
                        'vendas_money' => convert_float_money($item->vendas),
                        'meta' => $metas[$item->user_id] ?? 0,
                        'meta_money' => convert_float_money($metas[$item->user_id] ?? 0),
                        'margem_money' => '',
                        'diferenca_meta' => (($metas[$item->user_id] ?? 0) - $item->vendas),
                        'diferenca_meta_money' => convert_float_money(($metas[$item->user_id] ?? 0) - $item->vendas),
                        'setor' => $setores[$item->setor_id]
                    ];
            });

        $dados = [];
        foreach ($items as $item) {
            if ($item) $dados[] = $item;
        }
        return $dados;
    }
}
