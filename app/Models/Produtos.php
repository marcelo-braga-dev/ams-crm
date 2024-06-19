<?php

namespace App\Models;

use App\Services\Images;
use App\src\Produtos\ProdutosStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Produtos extends Model
{
    use HasFactory;

    protected $fillable = [
        'fornecedor_id',
        'categoria_id',
        'setor_id',
        'unidade_id',
        'unidade_valor',
        'status',
        'nome',
        'preco_fornecedor',
        'preco_venda',
        'estoque_local',
        'descricao',
        'url_foto'
    ];

    private function joinsAdd(Model $query)
    {
        return $query->leftJoin('produtos_fornecedores', 'produtos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->leftJoin('produtos_categorias', 'produtos.categoria_id', '=', 'produtos_categorias.id')
            ->leftJoin('produtos_unidades', 'produtos.unidade_id', '=', 'produtos_unidades.id')
            ->leftJoin('produtos_transitos', 'produtos.id', '=', 'produtos_transitos.produtos_id')
            ->groupBy('produtos.id')
            ->orderBy('produtos.nome');
    }

    private function colunas()
    {
        return ['produtos.*', 'produtos_categorias.nome AS categoria_nome', 'produtos_fornecedores.nome AS fornecedor',
            'produtos_unidades.nome AS unidade_nome',
            DB::raw('CAST(produtos_transitos.qtd AS SIGNED) AS estoque_transito'),
            DB::raw('DATE_FORMAT(produtos.created_at, "%d/%m/%Y %H:%i:%s") AS data_cadastro'),
            DB::raw('(SELECT is_financeiro FROM users WHERE id = 2) AS financeiro')
        ];
    }

    private function dado($item)
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'foto' => $item->url_foto ? asset('storage/' . $item->url_foto) : '',
            'fornecedor' => $item->fornecedor,
            'descricao' => $item->descricao,
            'preco' => $item->preco_venda,
            'preco_custo' => $item->financeiro ? $item->preco_fornecedor : null,
            'unidade' => $item->unidade_valor . ' ' . $item->unidade_nome,
            'categoria_nome' => $item->categoria_nome,
            'estoque' => $item->estoque_local ?? 0,
            'estoque_transito' => $item->estoque_transito ?? 0,
            'data_cadastro' => $item->data_cadastro,
            'status' => $item->status,
        ];
    }

    public function produto($id = null)
    {
        $item = $this->joinsAdd($this)
            ->where('produtos.id', $id)
            ->first($this->colunas());

        return $this->dado($item);
    }

    public function produtos($fornecedor = null)
    {
        return $this->joinsAdd($this)
            ->where($fornecedor ? ['produtos.fornecedor_id' => $fornecedor] : null)

            ->get($this->colunas())
            ->transform(function ($item) {
                return $this->dado($item);
            });
    }

    /**
     * @deprecated
     */
    public function getProdutos($idFornecedor)
    {
        $categorias = (new ProdutosCategorias())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();
        $estoqueVendedor = (new ProdutosTransito())->estoqueConsultor(id_usuario_atual());
        $financeiro = is_financeiro();

        return $this->newQuery()
            ->where('fornecedor_id', $idFornecedor)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($dados) use ($categorias, $estoqueVendedor, $unidades, $financeiro) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'preco_fornecedor' => $financeiro ? convert_float_money($dados->preco_fornecedor) : 0,
                    'preco_venda' => convert_float_money($dados->preco_venda),
                    'preco_venda_float' => $dados->preco_venda,
                    'preco_fornecedor_float' => $financeiro ? $dados->preco_fornecedor : 0,
                    'unidade' => $unidades[$dados->unidade_id] ?? '',
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
                'fornecedor_id' => $dados->fornecedor,
                'categoria_id' => $dados->categoria,
                'setor_id' => $dados->setor,
                'unidade_id' => $dados->unidade_id,
                'unidade_valor' => $dados->unidade_valor,
                'nome' => $dados->nome,
                'preco_fornecedor' => convert_money_float($dados->preco_fornecedor),
                'preco_venda' => convert_money_float($dados->preco_venda),
                'url_foto' => $url
            ]);

        return $dados->id;
    }

    public function find($id)
    {
        $dados = $this->newQuery()->find($id);
        $categorias = (new ProdutosCategorias())->getNomes();
        $fornecedores = (new ProdutosFornecedores())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();
        $financeiro = is_financeiro();

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'fornecedor_id' => $dados->fornecedor_id,
            'fornecedor_nome' => $fornecedores[$dados->fornecedor_id] ?? '',
            'preco_fornecedor' => $financeiro ? convert_float_money($dados->preco_fornecedor) : 0,
            'preco_venda' => convert_float_money($dados->preco_venda),
            'setor_id' => $dados->setor_id,
            'unidade_id' => $dados->unidade_id,
            'unidade_valor' => $dados->unidade_valor,
            'unidade_nome' => $unidades[$dados->unidade_id] ?? '',
            'estoque' => $dados->estoque_local,
            'foto' => $dados->url_foto,
            'categoria_id' => $dados->categoria_id,
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
            'fornecedor_id' => $dados->fornecedor,
            'categoria_id' => $dados->categoria,
            'setor_id' => $dados->setor,
            'unidade_id' => $dados->unidade_id,
            'unidade_valor' => $dados->unidade_valor,
            'nome' => $dados->nome,
            'preco_fornecedor' => convert_money_float($dados->preco_fornecedor),
            'preco_venda' => convert_money_float($dados->preco_venda)
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

        $atual = $dados->estoque_local - ($valorNovo - $valorAtual);

        $this->atualizarEstoqueLocal($id, $atual);
    }

    public function getProdutosFormulario($request)
    {
        $categorias = (new ProdutosCategorias())->getNomes();
        $fornecedores = (new ProdutosFornecedores())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();
        $estoqueVendedor = (new ProdutosTransito())->estoqueConsultor(id_usuario_atual());

        $query = $this->newQuery();

        if ($request->fornecedor) $query->where('fornecedor_id', $request->fornecedor);
        if ($request->categoria) $query->where('categoria', $request->categoria);
        if ($request->unidade) $query->where('unidade', $request->unidade_id);

        $financeiro = is_financeiro();

        return $query->orderBy('nome')
            ->get()
            ->transform(function ($dados) use ($categorias, $estoqueVendedor, $fornecedores, $unidades, $financeiro) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'descricao' => $dados->descricao,
                    'preco_fornecedor' => $financeiro ? convert_float_money($dados->preco_fornecedor) : 0,
                    'preco_venda' => convert_float_money($dados->preco_venda),
                    'preco_venda_float' => $dados->preco_venda,
                    'preco_fornecedor_float' => $financeiro ? $dados->preco_fornecedor : 0,
                    'unidade' => $unidades[$dados->unidade_id] ?? '',
                    'estoque' => $dados->estoque_local,
                    'estoque_consultor' => $estoqueVendedor[$dados->id] ?? 0,
                    'categoria' => $categorias[$dados->categoria] ?? '',
                    'fornecedor' => $fornecedores[$dados->fornecedor_id] ?? '',
                    'fornecedor_id' => $dados->fornecedor_id,
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
                    'fornecedores_id' => $item->fornecedor_id,
                ];
            });

        $res = [];
        foreach ($dados as $item) {
            $res[$item['id']] = $item;
        }
        return $res;
    }

    public function updateStatus(int $id, int $status)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => $status]);
    }

    public function updateEstoqueLocal(int $id, $estoque)
    {
        $this->newQuery()
            ->find($id)
            ->update(['estoque_local' => $estoque]);
    }
}
