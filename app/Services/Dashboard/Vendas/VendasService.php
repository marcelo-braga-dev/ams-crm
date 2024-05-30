<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\User;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Usuarios\Status\AtivoStatusUsuario;
use Illuminate\Support\Facades\DB;

class VendasService
{
    /**
     * @deprecated
     */
    public function metaVendas($mes, $ano, $setor): array
    {
        $isAdmin = is_admin();

        $vendasUsuarios = [];
        $totalVendas = 0;
        $totalMetas = 0;
        $totalCustos = 0;
        $totalQtd = 0;

        $usuarios = (new User())->usuarioSubordinados($setor);

        foreach ($usuarios as $usuario) {
            $vendas = 0;
            $metas = 0;
            $custos = 0;
            $qtd = 0;

            if (is_array($mes))
                foreach ($mes as $item) {
                    if ($usuario['status']) $metas += (new MetasVendas())->getMetaMes($usuario['id'], $item, $ano);
                }
            else {
                if ($usuario['status']) $metas = (new MetasVendas())->getMetaMes($usuario['id'], $mes, $ano);
            }

            if ($usuario['status'] == (new AtivoStatusUsuario)->getStatus() || $qtd > 0) {
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
                    'foto' => $usuario['foto'],
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

        $dados = [];
        foreach ($meses as $mes) {
            $item = $this->metaVendas($mes, $ano, $setor);
            $dados[] = ['mes' => $nomeMes[$mes], 'total_vendas' => $item['totalVendas'], 'total_metas' => $item['totalMetas']];
        }

        return $dados;
    }

    public function vendasPorEstados($mes, $ano, $setor)
    {
        $query = (new Pedidos())->newQuery();

        if (modelo_setor($setor) == 1) $query->leftJoin('pedidos_clientes', 'pedidos.id', '=', 'pedidos_clientes.pedido_id')
            ->leftJoin('enderecos', 'pedidos_clientes.endereco', '=', 'enderecos.id');

        else $query->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->leftJoin('enderecos', 'leads.endereco', '=', 'enderecos.id');

        return $query->whereIn('pedidos.status', (new StatusPedidosServices())->statusFaturados())
                ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
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


    public function vendasPorLeads($mes, $ano, $setor)
    {
        return (new Pedidos())->newQuery()
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusFaturados())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
                count(pedidos.id) as qtd,
                leads.id as lead_id,
                leads.nome as lead_nome,
                SUM(pedidos.preco_venda) as valor
                '))
            ->groupBy('pedidos.lead_id')
            ->orderByDesc('valor')
            ->limit(15)
            ->get()
            ->transform(function ($item) {
                return [
                    'lead_id' => $item->lead_id,
                    'lead_nome' => $item->lead_nome,
                    'qtd' => $item->qtd,
                    'valor' => $item->valor,
                ];
            });
    }
}
