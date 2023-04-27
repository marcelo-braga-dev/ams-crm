<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use Illuminate\Support\Facades\DB;

class VendasService
{
    public function metaVendas()
    {
        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNomes();
        $metas = (new MetasVendas())->metas();

        return (new Pedidos())->newQuery()
            ->where('status', '!=', (new RevisarStatusPedido())->getStatus())
            ->where('status', '!=', (new CanceladoStatus())->getStatus())
            ->select(
                'users_id',
                'setor',
                DB::raw('SUM(preco_venda) as vendas'))
            ->groupBy('users_id')
            ->get()
            ->transform(function ($item) use ($nomes, $setores, $metas) {
                return [
                    'nome' => $nomes[$item->users_id],
                    'vendas' => $item->vendas,
                    'vendas_money' => convert_float_money($item->vendas),
                    'meta' => $metas[$item->users_id] ?? 0,
                    'meta_money' => convert_float_money($metas[$item->users_id] ?? 0),
                    'margem_money' => '',
                    'diferenca_meta' => (($metas[$item->users_id] ?? 0) - $item->vendas),
                    'diferenca_meta_money' => convert_float_money(($metas[$item->users_id] ?? 0) - $item->vendas),
                    'setor' => $setores[$item->setor]
                ];
            });
    }
}
