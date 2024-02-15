<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FluxoCaixasConfig extends Model
{
    protected $fillable = [
        'chave',
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
            ->updateOrCreate(
                [$dados->chave],
                [$dados->valor]
            );
    }
}
