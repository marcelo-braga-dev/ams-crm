<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

/**
 * @deprecated
 */
class FluxoCaixasConfig extends Model
{
    protected $fillable = [
        'chave',
        'nome',
        'cnpj',
        'agencia',
        'conta',
    ];

    public function getBancos()
    {
        return $this->newQuery()
            ->where('chave', 'bancos')
            ->orderBy('nome')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => $item->nome,
                    'agencia' => $item->agencia,
                    'conta' => $item->conta,
                ];
            });
    }

    public function getEmpresas()
    {
        return $this->newQuery()
            ->where('chave', 'empresas')
            ->orderBy('nome')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => $item->nome,
                    'cnpj' => $item->cnpj
                ];
            });
    }

    public function getFornecedores()
    {
        return $this->newQuery()
            ->where('chave', 'fornecedores')
            ->orderBy('nome')
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
        // print_pre($dados->all());
        if ($dados->cnpj) {
            $exist = $this->newQuery()->where('cnpj', $dados->cnpj)->exists();
            if ($exist) throw new \DomainException('CNPJ já cadastrado');
        }

        $this->newQuery()
            ->create(
                [
                    'chave' => $dados->chave,
                    'nome' => $dados->nome,
                    'cnpj' => $dados->cnpj,
                    'agencia' => $dados->agencia,
                    'conta' => $dados->conta,
                ],
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
        if ($dados->nome) $this->newQuery()
            ->updateOrCreate(
                ['id' => $id],
                ['nome' => $dados->nome]
            );

        if ($dados->agencia) $this->newQuery()
            ->updateOrCreate(
                ['id' => $id],
                ['agencia' => $dados->agencia]
            );

        if ($dados->conta) $this->newQuery()
            ->updateOrCreate(
                ['id' => $id],
                ['conta' => $dados->conta]
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
