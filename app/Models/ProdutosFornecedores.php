<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosFornecedores extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'setor_id',
        'franquia_id',
        'cnpj',
        'atendente',
        'telefone',
        'email',
        'anotacoes',
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->get('nome'),
                'setor_id' => $dados->get('setor'),
                'franquia_id' => $dados->franquia,
                'cnpj' => preg_replace('/[^0-9]/', '', $dados->get('cnpj')),
                'atendente' => $dados->get('atendente'),
                'telefone' => preg_replace('/[^0-9]/', '', $dados->get('telefone')),
                'email' => $dados->get('email'),
                'anotacoes' => $dados->get('anotacoes')
            ]);
    }

    public function getNomes()
    {
        return $this->newQuery()->pluck('nome', 'id');
    }

    public function find($id)
    {
        if ($id) {
            $setores = (new Setores())->getNomes();
            $item = $this->newQuery()->find($id);
            return [
                'id' => $item->id,
                'nome' => $item->nome,
                'cnpj' => converterCNPJ($item->cnpj),
                'setor' => $setores[$item->setor_id]['nome'] ?? '',
                'setor_id' => $item->setor_id,
                'franquia' => $franquias[$item->franquia_id] ?? '',
                'franquia_id' => $item->franquia_id,
                'atendente' => $item->atendente,
                'telefone' => converterTelefone($item->telefone),
                'email' => $item->email,
                'anotacoes' => $item->anotacoes,
            ];
        }
        return null;
    }

    public function get()
    {
        return $this->newQuery()
            ->leftJoin('setores', 'produtos_fornecedores.setor_id', '=', 'setores.id')
            ->orderBy('nome')
            ->get(['produtos_fornecedores.*', 'setores.nome AS setor_nome'])
            ->transform(function ($item) {
                $item->cnpj = converterCNPJ($item->cnpj);
                return $item;
            });
    }

    public function gets()
    {
        return $this->newQuery()
            ->get();
    }

    /**
     * @deprecated
     */
    public function getDados(?int $setor)
    {
        $franquias = Franquias::getNomes();
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery();
        if ($setor) $query->where('setor_id', $setor);

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
        if ($setor) $query->where('setor_id', $setor);

        return $query->orderByDesc('id')->get();
    }

    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'id' => $dados->id,
                'nome' => $dados->nome,
                'cnpj' => converterInt($dados->cnpj),
                'setor_id' => $dados->setor,
                'franquia_id' => $dados->franquia_id,
                'atendente' => $dados->atendente,
                'telefone' => converterInt($dados->telefone),
                'email' => $dados->email,
                'anotacoes' => $dados->anotacoes,
            ]);
    }
}
