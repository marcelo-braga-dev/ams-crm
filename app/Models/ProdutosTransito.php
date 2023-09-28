<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosTransito extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'produtos_id',
        'qtd',
    ];

    public function consultor($id, $idFornecedor)
    {
        $estoques = $this->newQuery()
            ->where('users_id', $id)
            ->get();

        $items = [];
        foreach ($estoques as $estoque) {
            $items[$estoque->produtos_id] = $estoque->qtd;
        }

        $produtos = (new Produtos())->getProdutos($idFornecedor);

        $dados = [];
        foreach ($produtos as $produto) {
            $dados[] = [...$produto, 'qtd_transito' => $items[$produto['id']] ?? 0];
        }
        return $dados;
    }

    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['users_id' => $dados->id_usuario, 'produtos_id' => $id],
                ['qtd' => $dados->qtd]
            );
    }
}
