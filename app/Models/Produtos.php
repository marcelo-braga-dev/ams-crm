<?php

namespace App\Models;

use App\Services\Images;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produtos extends Model
{
    use HasFactory;

    protected $fillable = [
        'fornecedores_id',
        'setores_id',
        'nome',
        'preco_fornecedor',
        'preco_venda',
        'unidade',
        'estoque_local',
        'categoria',
        'url_foto'
    ];

    public function getProdutos($idFornecedor)
    {
        $categorias  = (new ProdutosCategorias())->getNomes();
        $estoqueVendedor = (new ProdutosTransito())->estoqueConsultor(id_usuario_atual());

        return $this->newQuery()
            ->where('fornecedores_id', $idFornecedor)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($dados) use ($categorias, $estoqueVendedor) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
                    'preco_venda' => convert_float_money($dados->preco_venda),
                    'preco_venda_float' => $dados->preco_venda,
                    'preco_fornecedor_float' => $dados->preco_fornecedor,
                    'unidade' => $dados->unidade,
                    'estoque' => $dados->estoque_local,
                    'estoque_consultor' => $estoqueVendedor[$dados->id] ?? 0,
                    'categoria' => $categorias[$dados->categoria] ?? '',
                    'foto' => url_arquivos($dados->url_foto)
                ];
            });
    }

    public function create($dados)
    {
        $url = (new Images())->armazenar($dados, 'foto', 'fotos_produtos');

        $this->newQuery()
            ->create([
                'fornecedores_id' => $dados->fornecedor,
                'nome' => $dados->nome,
                'preco_fornecedor' => convert_money_float($dados->preco_fornecedor),
                'preco_venda' => convert_money_float($dados->preco_venda),
                'unidade' => $dados->unidade,
                'categoria' => $dados->categoria,
                'url_foto' => $url
            ]);
    }

    public function find($id)
    {
        $dados = $this->newQuery()->find($id);

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'fornecedores_id' => $dados->fornecedores_id,
            'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
            'preco_venda' => convert_float_money($dados->preco_venda),
            'unidade' => $dados->unidade,
            'estoque' => $dados->estoque_local,
            'foto' => $dados->url_foto,
            'categoria' => $dados->categoria,
        ];
    }

    public function atualizar($id, $dados)
    {
        $sql = $this->newQuery()->find($id);

        if ($dados->foto) {
            $url = (new Images())->armazenar($dados, 'foto', 'fotos_produtos');
            $sql->update([
                'url_foto' => $url
            ]);
        }

        $sql->update([
            'nome' => $dados->nome,
            'preco_fornecedor' => convert_money_float($dados->preco_fornecedor),
            'preco_venda' => convert_money_float($dados->preco_venda),
            'unidade' => $dados->unidade,
            'categoria' => $dados->categoria,
        ]);
    }

    public function excluir($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
    }

    public function atualizarEstoqueLocal($id, $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'estoque_local' => $valor
            ]);
    }
}
