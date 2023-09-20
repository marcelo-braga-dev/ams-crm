<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigCores extends Model
{
    use HasFactory;

    protected $fillable = [
        'categoria',
        'chave',
        'valor'
    ];

    public function getPedidos()
    {
        $dados = $this->newQuery()
            ->where('categoria', 'pedidos')
            ->get();

        $cores = [];
        foreach ($dados as $dado) {
            $cores[$dado->chave] = $dado->valor;
        }
        return $cores;
    }

    public function reprovado($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'reprovado'],
                ['valor' => $valor]
            );
    }

    public function conferencia($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'conferencia'],
                ['valor' => $valor]
            );
    }

    public function lancado($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'lancado'],
                ['valor' => $valor]
            );
    }

    public function boleto($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'boleto'],
                ['valor' => $valor]
            );
    }

    public function pagamento($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'pagamento'],
                ['valor' => $valor]
            );
    }

    public function faturamento($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'faturamento'],
                ['valor' => $valor]
            );
    }

    public function faturado($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'faturado'],
                ['valor' => $valor]
            );
    }

    public function acompanhamento($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'acompanhamento'],
                ['valor' => $valor]
            );
    }

    public function entregue($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'entregue'],
                ['valor' => $valor]
            );
    }

    public function cancelados($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'cancelados'],
                ['valor' => $valor]
            );
    }

    public function encomenda($valor)
    {
        $this->newQuery()
            ->updateOrInsert(
                ['categoria' => 'pedidos', 'chave' => 'encomenda'],
                ['valor' => $valor]
            );
    }
}
