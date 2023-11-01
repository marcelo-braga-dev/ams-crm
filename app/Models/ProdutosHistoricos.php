<?php

namespace App\Models;

use App\src\Produtos\ProdutosStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProdutosHistoricos extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'users_id',
        'produtos_id',
        'valor',
        'status',
        'anotacoes',
        'data',
    ];

    public function create(int $idProduto, string $status, $valor = null, ?string $anot = null)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'produtos_id' => $idProduto,
                'valor' => $valor,
                'status' => $status,
                'anotacoes' => $anot,
                'data' => now()
            ]);
    }

    public function get($mes, $fornecedor, $consultor)
    {
        $mes = $mes ?? date('m');

        $produtos = (new Produtos())->getId();

        $query = (new ProdutosHistoricos())->newQuery()
            ->whereMonth('data', $mes)
            ->select(
                DB::raw('
                id, produtos_id, status, valor,
                WEEK(data) as semana,
                DAY(data) as dia,
                MONTH(data) as mes,
                YEAR(data) as ano
                '))
            ->orderBy('semana')
            ->orderBy('id');

        if ($consultor) $query->where('users_id', $consultor);

        $dados = $query->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'id_produto' => $item->produtos_id,
                    'valor' => $item->valor,
                    'status' => $item->status,

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
                $separacao[$item['id_produto']] = [...$item, ...$produtos[$item['id_produto']]];
                $separacao[$item['id_produto']]['semanas'] = $this->getNumerosSemanas($mes);
            }
        }

        // preeche quantidades
        $status = (new ProdutosStatus());
        foreach ($dados as $item) {
            if (!$fornecedor || $produtos[$item['id_produto']]['fornecedores_id'] == $fornecedor) {
                if ($item['status'] == $status->venda())
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['vendas'][] = [];

                if ($item['status'] == $status->local())
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['estoque_local'] = $item['valor'];

                if ($item['status'] == $status->transito())
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['transito'] = $item['valor'];
            }
        }

        $res = [];
        $i = 0;
        foreach ($separacao as $item) {
            $res[$i] = [
                ...$item,
                'semanas_datas' => $this->getDatasSemanas($mes)
            ];
            foreach ($item['semanas'] as $semanas) {
                $res[$i]['vendas_semanas'][] = [
                    'vendas' => count($semanas['vendas'] ?? []) ?: '-',
                    'estoque_local' => $semanas['estoque_local'] ?? '-',
                    'transito' => $semanas['transito'] ?? '-',
                ];
            }
            unset($res[$i]['semanas']);
            $i++;
        }

        return $res;
    }

    private function getNumerosSemanas($mes): array
    {
        $semanas = [];
        for ($i = 0; $i < $this->getQtdSemanas($mes); $i++) {
            $semanas[intval(date('W', strtotime("2023-$mes-01" . ' +' . ($i * 7) . 'days'))) + 1] = [];
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
