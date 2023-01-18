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
    }

    public function get($id)
    {
        return $this->newQuery()->find($id);
    }

    public function getEnderecoCompleto($id): string
    {
        $dados = $this->newQuery()->find($id);

        $complemento = '';
        if ($dados->complemento) $complemento = ' | COMPLEMENTO: ' . $dados->complemento;

        return 'RUA/AV: ' . $dados->rua .
            ' | NÚMERO: ' . $dados->numero . $complemento . ' | CEP: ' . $dados->cep .
            ' | BAIRRO: ' . $dados->bairro . ' | CIDADE: ' . $dados->cidade . ' | ESTADO: ' . $dados->estado;


    }

    public function getEnderecoLegivel($id): string
    {
        $dados = $this->newQuery()->find($id);

        return $dados->rua . 'n. ' . $dados->numero . ' ' . $dados->complemento . ', ' .
            $dados->bairro . ' - ' . $dados->cidade . '/' . $dados->estado . ' - Cep: ' . $dados->cep;
    }
}
