<?php

namespace App\Models;

use App\src\Produtos\ProdutosStatus;
use DateTime;
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
        'vendedor',
        'valor',
        'categoria',
        'fornecedor',
        'status',
        'anotacoes',
        'data',
    ];

    public function create($produto, string $status, int $vendedor, $valor = null, ?string $anot = null)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(), // id consultor
                'produtos_id' => $produto['id'],
                'valor' => $valor,
                'vendedor' => $vendedor,
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

        $categoriasNomes = (new ProdutosCategorias())->getNomes();

        $dados = $this->getDados($consultor, $fornecedor, $mes);

        // popula as semanas
        $separacao = [];
        $semanas = $this->getNumerosSemanas($mes);
        foreach ($dados as $item) {
            $separacao[$item['id_produto']] = [...$item];
            $separacao[$item['id_produto']]['semanas_datas'] = $this->getDatasSemanas($mes);
            $separacao[$item['id_produto']]['semanas'] = $semanas;
        }

        // preeche quantidades
        $status = (new ProdutosStatus());
        foreach ($dados as $item) {
            switch ($item['status']) {
                case $status->venda() :
                    $separacao[$item['id_produto']]['semanas'][$item['semana']]['vendas'][] = [];
                    break;
                case $status->local() :
                    {
                        $separacao[$item['id_produto']]['semanas'][$item['semana']]['estoque_local'] = $item['valor'];
                    }
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
            $semanas[intval(date('W', strtotime("2023-$mes-01" . ' +' . ($i * 7) . 'days')))] = [];
        }

        return $semanas;
    }

    public function getDatasSemanas($mes)
    {
        $semana = intval(date('W', strtotime("2023-$mes-01")));
        $d = new DateTime();
        $d->setISODate(2023, $semana);
        $inicio = $d->format('Y-m-d');

        $semanas = [];

        for ($i = 0; $i < $this->getQtdSemanas($mes); $i++) {
            $semanas[] = [
                'inicio' => date('d/m/Y', strtotime($inicio . ' +' . ($i * 7) . 'days')),
                'fim' => date('d/m/Y', strtotime($inicio . ' +' . ((($i + 1) * 7) - 1) . 'days'))
            ];
        }
        return $semanas;
    }

    private function getQtdSemanas($mes)
    {
        $primeiro = "2023-$mes-01";
        $ultimo = date('Y-m-t', strtotime("2023-$mes-01"));

        return intval(date('W', strtotime($ultimo))) -
            intval(date('W', strtotime($primeiro))) + 1;
    }

    public function getDados($consultor, $fornecedor, string $mes)
    {
        $fornecedoresNomes = (new Fornecedores())->getNomes();

        return (new ProdutosHistoricos())->newQuery()
            ->where($consultor ? ['vendedor' => $consultor] : null)
            ->where($fornecedor ? ['fornecedor' => $fornecedor] : null)
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
                    'semana' => $item->semana
                ];
            });
    }

    public function relatorio($mes, $consultor, $fornecedor)
    {
        $fornecedoresNomes = (new Fornecedores())->getNomes();

        return $this->newQuery()
            ->where($consultor ? ['vendedor' => $consultor] : null)
            ->where($fornecedor ? ['fornecedor' => $fornecedor] : null)
//            ->whereMonth('data', $mes)
            ->select(
                DB::raw('
                    id, produtos_id, status, valor, nome, categoria, fornecedor,
                    WEEK(data) as semana, MONTH(data) as mes, data
                '))
//            ->orderBy('semana')
//            ->orderBy('produtos_id')
            ->orderBy('data')
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
                    'mes' => $item->mes,
                    'data' => $item->data,
                ];
            });
    }
}
