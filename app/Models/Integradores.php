<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function getNomeIntegradores()
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id]['nome'] = $dado->nome;
            $dados[$dado->id]['cnpj'] = $dado->cnpj;
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
