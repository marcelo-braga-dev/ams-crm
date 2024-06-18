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
        'setores_id',
        'unidade_id',
        'status',
        'nome',
        'preco_fornecedor',
        'preco_venda',
//        'unidade',
        'estoque_local',
//        'categoria',
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
        return ['produtos.*', 'produtos_categorias.nome as categoria_nome', 'produtos_fornecedores.nome as fornecedor',
            'produtos_unidades.nome as unidade as unidade', 'produtos_unidades.valor as unidade_valor',
            DB::raw('CAST(produtos_transitos.qtd AS SIGNED) as estoque_transito'),
            DB::raw('DATE_FORMAT(produtos.created_at, "%d/%m/%Y %H:%i:%s") as data_cadastro'),
            DB::raw('(SELECT is_financeiro FROM users WHERE id = 2) as financeiro')
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
            'unidade' => $item->unidade_valor . ' ' . $item->unidade,
            'categoria_nome' => $item->categoria_nome,
            'estoque' => $item->estoque_local ?? 0,
            'estoque_transito' => $item->estoque_transito ?? 0,
            'data_cadastro' => $item->data_cadastro,
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
//            ->where($id ? ['produtos.id' => $id] : null)

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
            ->where('fornecedores_id', $idFornecedor)
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
        $fornecedores = (new ProdutosFornecedores())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();
        $financeiro = is_financeiro();

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'fornecedores_id' => $dados->fornecedores_id,
            'fornecedor_nome' => $fornecedores[$dados->fornecedores_id] ?? '',
            'preco_fornecedor' => $financeiro ? convert_float_money($dados->preco_fornecedor) : 0,
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

        if ($request->fornecedor) $query->where('fornecedores_id', $request->fornecedor);
        if ($request->categoria) $query->where('categoria', $request->categoria);
        if ($request->unidade) $query->where('unidade', $request->unidade);

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
