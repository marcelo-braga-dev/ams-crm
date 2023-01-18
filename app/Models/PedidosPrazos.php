<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *  prazos
 *      novo
 *      conferencia
 *      lancamento
 *      boleto
 *      pagamento
 *      faturando
 *      faturado
 */
class PedidosPrazos extends Model
{
    use HasFactory;

    protected $fillable = [
        'prazo',
        'valor'
    ];

    public function getRevisar()
    {
        return $this->newQuery()
            ->where('prazo', 'revisar')->first('valor')->valor ?? 0;
    }

    public function getConferencia()
    {
        return $this->newQuery()
            ->where('prazo', 'conferencia')->first('valor')->valor ?? 0;
    }

    public function getLancamento()
    {
        return $this->newQuery()
            ->where('prazo', 'lancamento')->first('valor')->valor ?? 0;
    }

    public function getBoleto()
    {
        return $this->newQuery()
            ->where('prazo', 'boleto')->first('valor')->valor ?? 0;
    }

    public function getPagamento()
    {
        return $this->newQuery()
            ->where('prazo', 'pagamento')->first('valor')->valor ?? 0;
    }

    public function getFaturando()
    {
        return $this->newQuery()
            ->where('prazo', 'faturando')->first('valor')->valor ?? 0;
    }

    public function getFaturado()
    {
        return $this->newQuery()
            ->where('prazo', 'faturado')->first('valor')->valor ?? 0;
    }


    public function setRevisar(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'revisar'],
                ['valor' => $valor]
            );
    }

    public function setConferencia(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'conferencia'],
                ['valor' => $valor]
            );
    }

    public function setLancamento(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'lancamento'],
                ['valor' => $valor]
            );
    }

    public function setBoleto(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'boleto'],
                ['valor' => $valor]
            );
    }

    public function setPagamento(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'pagamento'],
                ['valor' => $valor]
            );
    }

    public function setFaturando(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'faturando'],
                ['valor' => $valor]
            );
    }

    public function setFaturado(int $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['prazo' => 'faturado'],
                ['valor' => $valor]
            );
    }
}
