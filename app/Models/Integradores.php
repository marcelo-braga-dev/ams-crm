<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class Integradores extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'nome',
        'cnpj',
        'atendente',
        'telefone',
        'email',
        'anotacoes'
    ];

    public function getUsuario()
    {
        return $this->newQuery()
            ->where('users_id', auth()->id())
            ->get();
    }
    public function create($dados)
    {
        try {
            $this->newQuery()
                ->create([
                    'users_id'=> auth()->id(),
                    'nome' => $dados->get('nome'),
                    'cnpj' => $dados->get('cnpj'),
                    'atendente' => $dados->get('atendente'),
                    'telefone' =>$dados->get('telefone'),
                    'email' => $dados->get('email'),
                    'anotacoes' => $dados->get('anotacoes')
                ]);
        } catch (QueryException $e) {
            throw new \DomainException('Integrador duplicado, contacte um superior!');
        }
    }

    public function get(int $id)
    {
        $dados = $this->newQuery()->find($id);

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'cnpj' => converterCNPJ($dados->cnpj),
            'atendente' => $dados->atendente,
            'telefone' => converterTelefone($dados->telefone),
            'email' => $dados->email,
            'anotacoes' => $dados->anotacoes
        ];
    }
    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $dados->get('nome'),
                'cnpj' => $dados->get('cnpj'),
                'atendente' => $dados->get('atendente'),
                'telefone' =>$dados->get('telefone'),
                'email' => $dados->get('email'),
                'anotacoes' => $dados->get('anotacoes')
            ]);
    }

    public function getNomes(): array
    {
        $items = $this->newQuery()->get(['id', 'nome']);

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id] = $dado->nome;
        }
        return $dados;
    }

    public function getCardDados(): array
    {
        $items = $this->newQuery()->get(['id', 'nome']);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->id] = $item->nome;
        }

        return $dados;
    }
}
