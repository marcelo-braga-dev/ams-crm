<?php

namespace App\Models;

use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\StatusPedidos;
use App\src\Produtos\ProdutosStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PedidosFaturamentos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pedido_id',
        'produtos_id',
        'status',
        'status_pedido',
        'valor',
        'status_data',
        'setores_id',
    ];

    public function create($idPedido)
    {
        $pedido = (new Pedidos())->find($idPedido);
        $produtos = (new PedidosProdutos())->getFaturamento($idPedido);
        if ($produtos) {
            foreach ($produtos as $item) {
                $this->newQuery()
                    ->updateOrCreate(
                        ['pedido_id' => $idPedido, 'produtos_id' => $item['produto_id']],
                        [
                            'user_id' => $pedido->user_id,
                            'status' => 'novo',
                            'status_pedido' => $pedido->status,
                            'valor' => $item['preco'],
                            'status_data' => now(),
                            'setores_id' => $pedido->setor_id
                        ]
                    );
            }
        } else {
            $this->newQuery()
                ->create(
                    [
                        'pedido_id' => $idPedido,
                        'user_id' => $pedido->user_id,
                        'status' => 'novo',
                        'status_pedido' => $pedido->status,
                        'valor' => $pedido->preco_venda,
                        'status_data' => now(),
                        'setores_id' => $pedido->setor_id
                    ]
                );
        }
    }

    public function faturadosPeriodo($id = null, $mes = null, $ano = null)
    {
        $nomeLeads = (new Leads())->getNomes();
        $nomeClientes = (new PedidosClientes())->getNomes();
        $statusNome = (new StatusPedidos())->getStatus();

        return $pedidos = (new Pedidos())->newQuery()
            ->where('user_id', $id)
            ->whereIn('status', (new StatusPedidosServices())->statusFaturados())
            ->whereMonth('data_faturamento', $mes)
            ->whereYear('data_faturamento', $ano)
            ->get()
            ->transform(function ($item) use ($nomeLeads, $nomeClientes, $statusNome) {
                return [
                    'id' => $item->id,
                    'lead' => $nomeLeads[$item->lead_id] ?? '',
                    'cliente' => $nomeClientes[$item->id] ?? '',
                    'valor' => $item->preco_venda,
                    'status' => $statusNome[$item->status] ?? '',
                    'data' => $item->data_faturamento,
                ];
            });
    }

    public function get($mes, $fornecedor, $consultor)
    {
        $produtos = (new Produtos())->getId();

        $query = (new PedidosFaturamentos())->newQuery()
            ->whereMonth('status_data', $mes)
            ->select(
                DB::raw('
                id, produtos_id, status, valor, status_pedido,
                COUNT(id) as qtd, SUM(valor) as total,
                WEEK(status_data) as semana,
                DAY(status_data) as dia,
                MONTH(status_data) as mes,
                YEAR(status_data) as ano
                ')
            )
            ->orderBy('semana')
            ->orderBy('id')
            ->groupBy('produtos_id', 'valor', DB::raw('
                WEEK(status_data),
                MONTH(status_data),
                YEAR(status_data)
                '));

        if ($consultor) $query->where('user_id', $consultor);

        $dados = $query->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'id_produto' => $item->produtos_id,
                    'valor' => $item->valor,
                    'status' => $item->status,
                    'status_pedido' => $item->status_pedido,

                    'qtd' => $item->qtd,
                    'total' => $item->total,
                    'semana' => $item->semana,
                    'dia' => $item->dia,
                    'mes' => $item->mes,
                    'ano' => $item->ano,
                ];
            });

        // popula as semanas
        $separacao = [];
        foreach ($dados as $item) {
            if (!$fornecedor || $produtos[$item['id_produto']]['fornecedores_id'] == $fornecedor) {
                $separacao[$item['id_produto']]['dados'] = [
                    ...$produtos[$item['id_produto']] ?? [], ...$item,
                ];
                $separacao[$item['id_produto']]['vendas'] = $this->getNumerosSemanas($mes);
            }
        }

        $totalSemanas = $this->getNumerosSemanas($mes);

        foreach ($dados as $item) {
            if (!$fornecedor || $produtos[$item['id_produto']]['fornecedores_id'] == $fornecedor) {

                if (!($totalSemanas[$item['semana']] ?? null)) $totalSemanas[$item['semana']] = 0;
                $totalSemanas[$item['semana']] += $item['total'];

                $separacao[$item['id_produto']]['vendas'][$item['semana']][] = [
                    'valor' => convert_float_money($item['valor']),
                    'qtd' => $item['qtd'],
                    'total' => convert_float_money($item['total'])
                ];
            }
        }

        $res = [];
        foreach ($separacao as $item) {
            $res['produtos'][] = [
                ...$item['dados'],
                'vendas' => [...$item['vendas']]
            ];
        }

        $totalGerlSemanas = [];
        foreach ($totalSemanas as $item) {
            $totalGerlSemanas[] = convert_float_money($item);
        }
        $res['total_geral'] = $totalGerlSemanas;
        $res['semanas_datas'] = $this->getDatasSemanas($mes);

        //        print_pre($res);
        return $res;
    }

    private function getNumerosSemanas($mes): array
    {
        $semanas = [];
        for ($i = 0; $i < $this->getQtdSemanas($mes); $i++) {
            $semana = intval(date('W', strtotime("2023-$mes-02" . ' +' . ($i * 7) . 'days')));
            $semanas[$semana] = [];
        }
        return $semanas;
    }

    public function getDatasSemanas($mes)
    {
        $qtd = $this->getQtdSemanas($mes);
        $semanas = [];

        for ($i = 0; $i < $qtd; $i++) {
            $semanas[] = [
                'inicio' => date('d/m/y', strtotime("2023-$mes-01" . ' +' . ($i * 7) . 'days')),
                'fim' => ($i + 1) == $qtd ?
                    date('t/m/y', strtotime("2023-$mes-01")) :
                    date('d/m/y', strtotime("2023-$mes-01" . ' +' . ((($i + 1) * 7) - 1) . 'days'))

            ];
        }

        return $semanas;
    }

    private function getQtdSemanas($mes)
    {
        $primeiro = "2023-$mes-01";
        $ultimo = date('Y-m-t', strtotime("2023-$mes-01"));

        return (intval(date('W', strtotime($ultimo)))) -
            (intval(date('W', strtotime($primeiro))));
    }
}
