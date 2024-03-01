<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class FluxoCaixasConfig extends Model
{
    protected $fillable = [
        'chave',
        'nome',
        'cnpj',
    ];

    public function getBancos()
    {
        return $this->newQuery()
            ->where('chave', 'bancos')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => $item->nome,
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
                    'valor' => $item->nome,
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
                    'valor' => $item->nome,
                    'cnpj' => $item->cnpj
                ];
            });
    }

    public function getNomes()
    {
        return $this->newQuery()
            ->pluck('nome', 'id');
    }

    public function create($dados)
    {
        if ($dados->cnpj) {
            $exist = $this->newQuery()->where('cnpj', $dados->cnpj)->exists();
            if ($exist) throw new \DomainException('CNPJ já cadastrado');
        }

        $this->newQuery()
            ->create(
                ['chave' => $dados->chave, 'nome' => $dados->valor, 'cnpj' => $dados->cnpj],
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

    public function atualizar($id, $dados)
    {
        if ($dados->valor) $this->newQuery()
            ->updateOrCreate(
                ['id' => $id],
                ['nome' => $dados->valor]
            );

        if ($dados->cnpj) {
            $exist = $this->newQuery()
                ->where('cnpj', $dados->cnpj)
                ->exists();

            if ($exist) throw new \DomainException('CNPJ já cadastrado');

            $this->newQuery()
                ->updateOrCreate(
                    ['id' => $id],
                    ['cnpj' => $dados->cnpj]
                );
        }
    }
}
