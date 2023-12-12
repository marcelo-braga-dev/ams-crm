<?php

namespace App\Models;

use App\Services\Images;
use App\src\Produtos\ProdutosStatus;
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
        'descricao',
        'url_foto'
    ];

    public function getProdutos($idFornecedor)
    {
        $categorias = (new ProdutosCategorias())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();
        $estoqueVendedor = (new ProdutosTransito())->estoqueConsultor(id_usuario_atual());

        return $this->newQuery()
            ->where('fornecedores_id', $idFornecedor)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($dados) use ($categorias, $estoqueVendedor, $unidades) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
                    'preco_venda' => convert_float_money($dados->preco_venda),
                    'preco_venda_float' => $dados->preco_venda,
                    'preco_fornecedor_float' => $dados->preco_fornecedor,
                    'unidade' => $unidades[$dados->unidade] ?? '',
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

        $dados = $this->newQuery()
            ->create([
                'fornecedores_id' => $dados->fornecedor,
                'nome' => $dados->nome,
                'preco_fornecedor' => convert_money_float($dados->preco_fornecedor),
                'preco_venda' => convert_money_float($dados->preco_venda),
                'unidade' => $dados->unidade,
                'categoria' => $dados->categoria,
                'descricao' => $dados->descricao,
                'url_foto' => $url
            ]);

        return $dados->id;
    }

    public function find($id)
    {
        $dados = $this->newQuery()->find($id);
        $categorias = (new ProdutosCategorias())->getNomes();
        $fornecedores = (new Fornecedores())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'fornecedores_id' => $dados->fornecedores_id,
            'fornecedor_nome' => $fornecedores[$dados->fornecedores_id] ?? '',
            'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
            'preco_venda' => convert_float_money($dados->preco_venda),
            'unidade' => $dados->unidade,
            'unidade_nome' => $unidades[$dados->unidade] ?? '',
            'estoque' => $dados->estoque_local,
            'foto' => $dados->url_foto,
            'categoria' => $dados->categoria,
            'categoria_nome' => $categorias[$dados->categoria] ?? '',
            'descricao' => $dados->descricao,
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
            'descricao' => $dados->descricao,
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
        $produto = $this->newQuery()
            ->find($id);

        $produto->update([
            'estoque_local' => $valor
        ]);

        (new ProdutosHistoricos())->create($produto, (new ProdutosStatus())->local(), $valor, id_usuario_atual());
    }

    public function subtrairEstoque($id, $valorAtual, $valorNovo)
    {
        $dados = $this->newQuery()
            ->find($id);

        $atual = $dados->estoque_local - ($valorNovo - $valorAtual);//153

        $this->atualizarEstoqueLocal($id, $atual);
    }

    public function getProdutosFormulario($request)
    {
        $categorias = (new ProdutosCategorias())->getNomes();
        $fornecedores = (new Fornecedores())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();
        $estoqueVendedor = (new ProdutosTransito())->estoqueConsultor(id_usuario_atual());

        $query = $this->newQuery();

        if ($request->fornecedor) $query->where('fornecedores_id', $request->fornecedor);
        if ($request->categoria) $query->where('categoria', $request->categoria);
        if ($request->unidade) $query->where('unidade', $request->unidade);

        return $query->orderBy('nome')
            ->get()
            ->transform(function ($dados) use ($categorias, $estoqueVendedor, $fornecedores, $unidades) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'descricao' => $dados->descricao,
                    'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
                    'preco_venda' => convert_float_money($dados->preco_venda),
                    'preco_venda_float' => $dados->preco_venda,
                    'preco_fornecedor_float' => $dados->preco_fornecedor,
                    'unidade' => $unidades[$dados->unidade] ?? '',
                    'estoque' => $dados->estoque_local,
                    'estoque_consultor' => $estoqueVendedor[$dados->id] ?? 0,
                    'categoria' => $categorias[$dados->categoria] ?? '',
                    'fornecedor' => $fornecedores[$dados->fornecedores_id] ?? '',
                    'fornecedor_id' => $dados->fornecedores_id,
                    'foto' => url_arquivos($dados->url_foto)
                ];
            });
    }

    public function getId()
    {
        $dados = $this->newQuery()
            ->get()->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'fornecedores_id' => $item->fornecedores_id,
                ];
            });

        $res = [];
        foreach ($dados as $item) {
            $res[$item['id']] = $item;
        }
        return $res;
    }
}
