<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fornecedores extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'setor',
        'cnpj',
        'atendente',
        'telefone',
        'email',
        'anotacoes'
    ];

    public function find(int $id)
    {
        return $this->newQuery()->findOrFail($id);
    }

    public function getNomeFornecedores()
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id] = $dado->nome;
        }

        return $dados;
    }

    public function getAll(?int $setor)
    {
        $query = $this->newQuery();
        if ($setor) $query->where('setor', $setor);

        return $query->orderByDesc('id')->get();
    }

    public function create($dados)
    {
        $setor = $dados->get('setor') ?? auth()->user()->setor;

        $this->newQuery()
            ->create([
                'nome' => $dados->get('nome'),
                'setor' => $setor,
                'cnpj' => $dados->get('cnpj'),
                'atendente' => $dados->get('atendente'),
                'telefone' =>$dados->get('telefone'),
                'email' => $dados->get('email'),
                'anotacoes' => $dados->get('anotacoes')
            ]);
    }

    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $dados->get('nome'),
                'cnpj' => $dados->get('cnpj'),
                'setor' => $dados->get('setor'),
                'atendente' => $dados->get('atendente'),
                'telefone' =>$dados->get('telefone'),
                'email' => $dados->get('email'),
                'anotacoes' => $dados->get('anotacoes')
            ]);
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
