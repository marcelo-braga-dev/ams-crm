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

    public function create()
    {

    }

    public function getNomes()
    {
        return $this->newQuery()->pluck('nome','id');
    }

    /**
     * @deprecated
     */
    public function find($id)
    {
        if ($id) {
            $setores = (new Setores())->getNomes();
            $item = $this->newQuery()->find($id);
            return [
                'id' => $item->id,
                'nome' => $item->nome,
                'cnpj' => $item->cnpj,
                'setor' => $setores[$item->setor_id]['nome'] ?? '',
                'setor_id' => $item->setor_id,
                'franquia' => $franquias[$item->franquia] ?? '',
                'franquia_id' => $item->franquia,
                'atendente' => $item->atendente,
                'telefone' => $item->telefone,
                'email' => $item->email,
                'anotacoes' => $item->anotacoes,
            ];;
        }
        return null;
    }

    public function fornecedores()
    {
        return $this->newQuery()
            ->leftJoin('setores', 'produtos_fornecedores.setor_id', '=', 'setores.id')
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
}
