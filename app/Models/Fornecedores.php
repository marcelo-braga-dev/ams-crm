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
        'franquia',
        'cnpj',
        'atendente',
        'telefone',
        'email',
        'anotacoes'
    ];

    public function find($id)
    {
        if ($id) {
            $item = $this->newQuery()->find($id);
            return $this->dados($item);
        }
        return null;
    }

    public function getNomes()
    {
        return $this->newQuery()->pluck('nome','id');
    }

    public function get()
    {
        return $this->newQuery()
            ->get();
    }

    public function getDados(?int $setor)
    {
        $franquias = Franquias::getNomes();
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery();
        if ($setor) $query->where('setor', $setor);

        return $query->orderByDesc('id')->get()
            ->transform(function ($items) use ($franquias, $setores) {
                return $this->dados($items, $franquias, $setores);
            });
    }

    /**
     * @deprecated
     */
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
