<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\Pedidos;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TopVendasService
{
    public function consultores()
    {
        $nomes = (new User())->getNomes();

        return (new Pedidos())->newQuery()
            ->select('user_id', DB::raw('SUM(preco_venda) as vendas'))
            ->orderByDesc('vendas')
            ->groupBy('user_id')
            ->limit(5)
            ->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'nome' => $nomes[$item->user_id] ?? '',
                    'valor' => $item->vendas
                ];
            });
    }

    public function integradores()
    {
        return (new Pedidos())->newQuery()
            ->select('user_id', 'integrador', DB::raw('SUM(preco_venda) as vendas'))
            ->orderByDesc('vendas')
            ->groupBy('integrador')
            ->limit(5)
            ->get()
            ->transform(function ($item) {
                return [
                    'nome' => $nomes[$item->user_id] ?? '',
                    'valor' => $item->vendas
                ];
            });
    }
}
