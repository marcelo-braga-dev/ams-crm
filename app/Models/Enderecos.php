<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class Enderecos extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'cep',
        'rua',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
    ];

    public function create($dados)
    {
        try {
            $dado = $this->newQuery()
                ->create([
                    'cep' => $dados['cep'] ?? '',
                    'rua' => $dados['rua'] ?? '',
                    'numero' => $dados['numero'] ?? '',
                    'complemento' => $dados['complemento'] ?? '',
                    'bairro' => $dados['bairro'] ?? '',
                    'cidade' => $dados['cidade'] ?? '',
                    'estado' => $dados['estado'] ?? '',
                ]);
            return $dado->id;
        } catch (QueryException $exception) {
            throw new \DomainException('Falha no cadastro do endereço.');
        }
    }

    public function updateDados($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'cep' => $dados['cep'] ?? '',
                'rua' => $dados['rua'] ?? '',
                'numero' => $dados['numero'] ?? '',
                'complemento' => $dados['complemento'] ?? '',
                'bairro' => $dados['bairro'] ?? '',
                'cidade' => $dados['cidade'] ?? '',
                'estado' => $dados['estado'] ?? '',
            ]);

        return $id;
    }

    public function get($id)
    {
        $dados = $this->newQuery()->find($id);

        return [
            'cep' => $dados->cep ?? '',
            'rua' => $dados->rua ?? '',
            'numero' => $dados->numero ?? '',
            'complemento' => $dados->complemento ?? '',
            'bairro' => $dados->bairro ?? '',
            'cidade' => $dados->cidade ?? '',
            'estado' => $dados->estado ?? '',
        ];
    }

    public function getEnderecoCompleto($id): string
    {
        $dados = $this->newQuery()->find($id);

        $enderecoCompleto = '';

        if ($dados->rua) $enderecoCompleto .= 'RUA/AV: ' . $dados->rua;
        if ($dados->numero) $enderecoCompleto .= ' | NÚMERO: ' . $dados->numero;
        if ($dados->complemento) $enderecoCompleto .= ' | COMPLEMENTO: ' . $dados->complemento;
        if ($dados->bairro) $enderecoCompleto .= ' | BAIRRO: ' . $dados->bairro;
        if ($dados->cidade) $enderecoCompleto .= ' | CIDADE: ' . $dados->cidade;
        if ($dados->estado) $enderecoCompleto .= ' | ESTADO: ' . $dados->estado;
        if ($dados->cep) $enderecoCompleto .= ' | CEP: ' . $dados->cep;

        return $enderecoCompleto;
    }

    public function getEnderecoPadrao($id): string
    {
        $dados = $this->newQuery()->find($id);

        $enderecoCompleto = '';

        if ($dados['rua']) $enderecoCompleto .= '' . $dados['rua'];
        if ($dados['numero']) $enderecoCompleto .= ', ' . $dados['numero'];
        if ($dados['complemento']) $enderecoCompleto .= ', ' . $dados['complemento'];
        if ($dados['bairro']) $enderecoCompleto .= ' - ' . $dados['bairro'];
        if ($dados['cidade']) $enderecoCompleto .= ', ' . $dados['cidade'];
        if ($dados['estado']) $enderecoCompleto .= ' - ' . $dados['estado'];
        if ($dados['cep']) $enderecoCompleto .= ', ' . $dados['cep'];

        return $enderecoCompleto;
    }

    public function getEnderecoLegivel($id): string
    {
        $dados = $this->newQuery()->find($id);

        return $dados->rua . 'n. ' . $dados->numero . ' ' . $dados->complemento . ', ' .
            $dados->bairro . ' - ' . $dados->cidade . '/' . $dados->estado . ' - Cep: ' . $dados->cep;
    }

    public function remover($id)
    {
        $id ?
            $this->newQuery()
                ->find($id)
                ->delete() : null;
    }
}
