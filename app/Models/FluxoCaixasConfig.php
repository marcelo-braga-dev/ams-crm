<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class FluxoCaixasConfig extends Model
{
    protected $fillable = [
        'chave',
        'valor',
    ];

    protected $casts = [
        'data' => 'date',
        'data_vencimento' => 'date',
    ];

    public function getBancos()
    {
        return $this->newQuery()
            ->where('chave', 'bancos')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => $item->valor,
                ];
            });
    }

    public function getEmpresas()
    {
        return $this->newQuery()
            ->where('chave', 'empresas')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => $item->valor,
                ];
            });
    }

    public function getFornecedores()
    {
        return $this->newQuery()
            ->where('chave', 'fornecedores')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => $item->valor,
                ];
            });
    }

    public function getNomes()
    {
        return $this->newQuery()
            ->pluck('valor', 'id');
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create(
                ['chave' => $dados->chave, 'valor' => $dados->valor],
            );
    }

    public function remover($id)
    {
        try {
            $this->newQuery()
                ->find($id)
                ->delete();
        } catch (QueryException) {
            throw new \DomainException('Não é possível deletar esta dado pois ele está em uso.');
        }
    }

    public function atualizar($id, $valor)
    {
        if ($valor) $this->newQuery()
            ->find($id)
            ->update(['valor' => $valor]);
    }
}
