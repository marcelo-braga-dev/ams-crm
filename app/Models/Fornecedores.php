<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @deprecated
 */
class Fornecedores extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'setor',
        'franquia',
        'cnpj',
        'atendente',
        'telefone',
        'email',
        'anotacoes'
    ];



    public function get()
    {
        return $this->newQuery()
            ->get();
    }

    public function create($dados)
    {
        $setor = $dados->get('setor') ?? auth()->user()->setor;

        $this->newQuery()
            ->create([
                'nome' => $dados->get('nome'),
                'setor' => $setor,
                'franquia' => $dados->franquia,
                'cnpj' => $dados->get('cnpj'),
                'atendente' => $dados->get('atendente'),
                'telefone' => $dados->get('telefone'),
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
                'franquia' => $dados->get('franquia'),
                'atendente' => $dados->get('atendente'),
                'telefone' => $dados->get('telefone'),
                'email' => $dados->get('email'),
                'anotacoes' => $dados->get('anotacoes')
            ]);
    }

    private function dados($item, $franquias = [], $setores = [])
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'cnpj' => $item->cnpj,
            'setor' => $setores[$item->setor]['nome'] ?? '',
            'setor_id' => $item->setor,
            'franquia' => $franquias[$item->franquia] ?? '',
            'franquia_id' => $item->franquia,
            'atendente' => $item->atendente,
            'telefone' => $item->telefone,
            'email' => $item->email,
            'anotacoes' => $item->anotacoes,
        ];
    }
}
