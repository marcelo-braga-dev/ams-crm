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
        'nome',
        'valor',
        'categoria',
        'fornecedor',
        'status',
        'anotacoes',
        'data',
    ];

    public function create($produto, string $status, $valor = null, ?string $anot = null)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'produtos_id' => $produto['id'],
                'valor' => $valor,
                'status' => $status,
                'anotacoes' => $anot,
                'data' => now(),
                'nome' => $produto['nome'],
                'categoria' => $produto['categoria'],
                'fornecedor' => $produto['fornecedores_id'],
            ]);
    }

    public function get($mes, $fornecedor, $consultor)
    {
        $mes = $mes ?? date('m');

        $produtos = (new Produtos())->getId();
        $categoriasNomes = (new ProdutosCategorias())->getNomes();
        $fornecedoresNomes = (new Fornecedores())->getNomes();

        $dados = (new ProdutosHistoricos())->newQuery()
            ->where($consultor ? ['users_id' => $consultor] : null)
//            ->where($fornecedor ? ['fornecedores_id' => $fornecedor] : null)
            ->whereMonth('data', $mes)
            ->select(
                DB::raw('
                id, produtos_id, status, valor, nome, categoria, fornecedor,
                WEEK(data) as semana
                '))
            ->orderBy('semana')
            ->orderBy('nome')
            ->get()
            ->transform(function ($item) use ($fornecedoresNomes) {
                return [
                    'id' => $item->id,
                    'id_produto' => $item->produtos_id,
                    'valor' => $item->valor,
                    'status' => $item->status,
                    'nome' => $item->nome,
                    'categoria' => $item->categoria,
                    'fornecedor' => $fornecedoresNomes[$item->fornecedor] ?? '',

                    'semana' => $item->semana,
                ];
            });

        // popula as semanas
        $separacao = [];
        foreach ($dados as $item) {
            $separacao[$item['id_produto']] = [...$item, ...$produtos[$item['id_produto']]];
            $separacao[$item['id_produto']]['semanas'] = $this->getNumerosSemanas($mes);

        }

        // preeche quantidades
        $status = (new ProdutosStatus());
        foreach ($dados as $item) {
            switch ($item['status']) {
                case $status->venda() :
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['vendas'][] = [];
                    break;
                case $status->local() :
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['estoque_local'] = $item['valor'];
                    break;
                case $status->transito() :
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['transito'] = $item['valor'];
                    break;
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
                    'total' => (($semanas['estoque_local'] ?? 0) + ($semanas['transito'] ?? 0))
                ];
            }
            unset($res[$i]['semanas']);
            $i++;
        }

        $resCategorias = [];
        foreach ($res as $index => $item) {
            $resCategorias[$item['categoria']]['categoria_nome'] = $categoriasNomes[$item['categoria']] ?? '-';
            $resCategorias[$item['categoria']]['produtos'][$index][] = ['categoria_nome' => $categoriasNomes[$item['categoria']] ?? '-', ...$item];
        }

        return [...$resCategorias];
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
