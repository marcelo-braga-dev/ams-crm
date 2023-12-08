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
        $fornecedoresNomes = (new Fornecedores())->getNomes();

        return (new ProdutosHistoricos())->newQuery()
            ->where($consultor ? ['vendedor' => $consultor] : null)
            ->where($fornecedor ? ['fornecedor' => $fornecedor] : null)
//            ->whereMonth('data', $mes)
            ->select(
                DB::raw('
                id, produtos_id, status, valor, nome, categoria, fornecedor,
                WEEK(data) as semana
                '))
            ->orderBy('semana')
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
//            ->orderBy('nome')
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
