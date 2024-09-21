<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\Leads\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\User;
use App\Services\Pedidos\StatusPedidosServices;
use Illuminate\Support\Facades\DB;

class TopVendasService
{
    public function consultores($mes, $ano)
    {
        $nomes = (new User())->getNomes();

        return (new Pedidos())->newQuery()
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereMonth('created_at', $mes)
            ->whereYear('created_at', $ano)
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

    public function integradores($mes, $ano)
    {
        $nomes = (new LeadsANTIGO())->getNomes();

        return (new Pedidos())->newQuery()
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereMonth('created_at', $mes)
            ->whereYear('created_at', $ano)
            ->select('user_id', 'lead_id', DB::raw('SUM(preco_venda) as vendas'))
            ->orderByDesc('vendas')
            ->groupBy('lead_id')
            ->limit(5)
            ->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'nome' => $nomes[$item->lead_id] ?? '',
                    'valor' => $item->vendas
                ];
            });
    }
}
