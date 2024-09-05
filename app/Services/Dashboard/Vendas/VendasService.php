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

        return $query->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
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


    public function vendasPorLeads($mes, $ano, $setor, $limit = null, $index = false)
    {
        $items = (new Pedidos())->newQuery()
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
                count(pedidos.id) as qtd,
                leads.id as lead_id,
                leads.nome as lead_nome,
                SUM(pedidos.preco_venda) as valor,
                leads.ultimo_pedido_data as pedido_data,
                DATEDIFF(CURDATE(), leads.ultimo_pedido_data) as dif_data
                '))
            ->groupBy('pedidos.lead_id')
            ->orderByDesc('valor')
            ->get()
            ->transform(function ($item) {
                return [
                    'lead_id' => $item->lead_id,
                    'lead_nome' => $item->lead_nome,
                    'qtd' => $item->qtd,
                    'valor' => $item->valor,
                    'pedido_data' => date('d/m/y', strtotime($item->pedido_data)),
                    'pedido_data_dif' => $item->dif_data,
                ];
            });

        if ($index) {
            $res = [];
            foreach ($items as $item) {
                $res[$item['lead_id']] = $item;
            }
            return $res;
        }
        return $items;
    }

    public function vendasPorLeadsIds($mes, $ano, $mesComp, $anoComp, $setor, $limit = null)
    {
        return (new Pedidos())->newQuery()
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), [...$mesComp, ...$mes])
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
                leads.id as lead_id,
                leads.nome as lead_nome,
                leads.ultimo_pedido_data as pedido_data,
                DATEDIFF(CURDATE(), leads.ultimo_pedido_data) as dif_data,
                SUM(pedidos.preco_venda) as valor
                '))
            ->groupBy('pedidos.lead_id')
            ->orderByDesc('valor')
            ->limit($limit)
            ->get()
            ->transform(function ($item) {
                return [
                    'lead_id' => $item->lead_id,
                    'lead_nome' => $item->lead_nome,
                    'pedido_data' => date('d/m/y', strtotime($item->pedido_data)),
                    'pedido_data_dif' => $item->dif_data,
                ];
            });
    }

    public function vendasFornecedores($mes, $ano, $setor, $limit = null, $index = false)
    {
        $items = (new Pedidos())->newQuery()
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
                count(pedidos.id) AS qtd,
                produtos_fornecedores.id AS fornecedor_id,
                produtos_fornecedores.nome AS fornecedor_nome,
                SUM(pedidos.preco_venda) AS valor
                '))
            ->groupBy('pedidos.fornecedor_id')
            ->orderByDesc('valor')
            ->get()
            ->transform(function ($item) {
                return [
                    'fornecedor_id' => $item->fornecedor_id,
                    'fornecedor_nome' => $item->fornecedor_nome,
                    'qtd' => $item->qtd,
                    'valor' => $item->valor,
                    'pedido_data' => date('d/m/y', strtotime($item->pedido_data)),
                    'pedido_data_dif' => $item->dif_data,
                ];
            });

        if ($index) {
            $res = [];
            foreach ($items as $item) {
                $res[$item['fornecedor_id']] = $item;
            }
            return $res;
        }
        return $items;
    }

    public function vendasFornecedor($fornecedor, $mes, $ano, $setor, $limit = null, $index = false)
    {
        $items = (new Pedidos())->newQuery()
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->leftJoin('pedidos_clientes', 'pedidos.id', '=', 'pedidos_clientes.pedido_id')
            ->leftJoin('users', 'pedidos.user_id', '=', 'users.id')
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->where('pedidos.fornecedor_id', $fornecedor)
            ->select(DB::raw('
                pedidos.preco_venda, pedidos.data_faturamento, pedidos.id AS pedido_id,
                pedidos_clientes.nome AS cliente_nome, pedidos_clientes.razao_social AS cliente_razao_social,
                produtos_fornecedores.id AS fornecedor_id,
                produtos_fornecedores.nome AS fornecedor_nome,
                users.name AS consultor_nome, leads.nome AS lead_nome
                '))
//            ->orderByDesc('valor')
            ->get()
            ->transform(function ($item) {
                return [
                    'pedido_id' => $item->pedido_id,
                    'fornecedor_id' => $item->fornecedor_id,
                    'fornecedor_nome' => $item->fornecedor_nome,
                    'cliente_nome' => $item->cliente_nome,
                    'consultor_nome' => $item->consultor_nome,
                    'cliente_razao_social' => $item->cliente_razao_social,
                    'cliente_id' => $item->cliente_id,
                    'lead_nome' => $item->lead_nome,
                    'valor' => $item->preco_venda,
                    'data' => date('d/m/y H:i', strtotime($item->data_faturamento))
                ];
            });
        return $items;
    }

    public function vendasFornecedoresPorUsuarios($mes, $ano, $setor)
    {
        $dados = (new Pedidos())->newQuery()
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
        pedidos.user_id,
        count(pedidos.id) AS qtd,
        produtos_fornecedores.id AS fornecedor_id,
        produtos_fornecedores.nome AS fornecedor_nome,
        SUM(pedidos.preco_venda) AS valor
    '))
            ->groupBy('pedidos.user_id', 'pedidos.fornecedor_id')
            ->orderByDesc('valor')
            ->get()
            ->transform(function ($item) {
                return [
                    'user_id' => $item->user_id,
                    'fornecedor_id' => $item->fornecedor_id,
                    'fornecedor_nome' => $item->fornecedor_nome,
                    'qtd' => $item->qtd,
                    'valor' => $item->valor,
                    'pedido_data' => date('d/m/y', strtotime($item->pedido_data)),
                    'pedido_data_dif' => $item->dif_data,
                ];
            });

        $usuarios = [];
        foreach ($dados as $dado) {
            $usuarios[$dado['user_id']][] = $dado;
        }

        return $usuarios;
    }

    public function vendasFornecedoresPorUsuario($mes, $ano, $userId, $setor)
    {
        return (new Pedidos())->newQuery()
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->where('pedidos.user_faturamento', $userId)
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
            pedidos.user_id,
            count(pedidos.id) AS qtd,
            produtos_fornecedores.id AS fornecedor_id,
            produtos_fornecedores.nome AS fornecedor_nome,
            SUM(pedidos.preco_venda) AS valor
        '))
            ->groupBy('pedidos.user_id', 'pedidos.fornecedor_id')
            ->orderByDesc('valor')
            ->get()
            ->transform(function ($item) {
                return [
                    'user_id' => $item->user_id,
                    'fornecedor_id' => $item->fornecedor_id,
                    'fornecedor_nome' => $item->fornecedor_nome,
                    'qtd' => $item->qtd,
                    'valor' => $item->valor,
                    'pedido_data' => date('d/m/y', strtotime($item->pedido_data)),
                    'pedido_data_dif' => $item->dif_data,
                ];
            });
    }
}
