<?php

namespace App\Models;

use App\src\Produtos\Notificacoes\NotificarEstoque;
use App\src\Produtos\ProdutosStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosTransito extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'produtos_id',
        'qtd',
    ];

    public function consultor($id, $idFornecedor)
    {
        $estoques = $this->newQuery()
            ->where('user_id', $id)
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
        $produto = (new Produtos())->find($id);

        $valorAtual = $this->newQuery()
            ->where('user_id', $dados->id_usuario)
            ->where('produtos_id', $id)
            ->first()
            ->qtd ?? 0;

        $this->newQuery()
            ->updateOrCreate(
                ['user_id' => $dados->id_usuario, 'produtos_id' => $id],
                ['qtd' => $dados->qtd]
            );

        (new Produtos())->subtrairEstoque($id, $valorAtual, $dados->qtd);
        (new ProdutosHistoricos())->create($produto, (new ProdutosStatus())->transito(), $dados->id_usuario, $dados->qtd);
    }

    public function estoqueConsultor($id): array
    {
        $dados = $this->newQuery()
            ->where('user_id', $id)
            ->get();

        $res = [];
        foreach ($dados as $item) {
            $res[$item->produtos_id] = $item->qtd;
        }

        return $res;
    }

    public function subtrairVendaPedido($dados)
    {
        foreach ($dados->produtos as $item) {
            if ($item['qtd'] ?? null) {
                $estoque = $this->newQuery()
                    ->where('user_id', id_usuario_atual())
                    ->where('produtos_id', $item['id'])
                    ->first();

                $this->newQuery()
                    ->updateOrCreate(
                        ['user_id' => id_usuario_atual(), 'produtos_id' => $item['id']],
                        ['qtd' => ($estoque->qtd ?? 0) - $item['qtd']]
                    );

                (new NotificarEstoque())->alteracao();
            }
        }
    }
}
