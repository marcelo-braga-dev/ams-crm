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
        'unidade_id',
        'setor_id',
        'sku',
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
            ->groupBy('produtos.id')
            ->orderBy('produtos.nome');
    }

    private function colunas()
    {
        return ['produtos.*', 'produtos_categorias.nome AS categoria_nome', 'produtos_fornecedores.nome AS fornecedor',
            'produtos_unidades.nome AS unidade_nome',
            DB::raw('DATE_FORMAT(produtos.created_at, "%d/%m/%Y %H:%i:%s") AS data_cadastro'),
            DB::raw('(SELECT is_financeiro FROM users WHERE id = 2) AS financeiro')
        ];
    }

    private function dado($item)
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'sku' => $item->sku,
            'foto' => $item->url_foto ? asset('storage/' . $item->url_foto) : '',
            'fornecedor' => $item->fornecedor,
            'descricao' => $item->descricao,
            'preco' => $item->preco_venda,
            'preco_custo' => $item->financeiro ? $item->preco_fornecedor : null,
            'unidade' => $item->unidade_valor . ' ' . $item->unidade_nome,
            'categoria_nome' => $item->categoria_nome,
            'estoque' => $item->estoque_local ?? 0,
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

    public function produtos($filtros, $setor = null)
    {
        $query = $this->joinsAdd($this)
            ->where(($filtros['fornecedor'] ?? null) ? ['produtos.fornecedor_id' => $filtros['fornecedor']] : null)
            ->where(($filtros['categoria'] ?? null) ? ['produtos.categoria_id' => $filtros['categoria']] : null);
        $query->whereIn('categoria_id', (new ProdutosCategoriasUsuarios())->categorias(id_usuario_atual()));

        if ($setor) $query->where('produtos.setor_id', $setor);

        if (($filtros['filtro'] ?? null) && ($filtros['filtro_valor'] ?? null)) {
            if ($filtros['filtro'] == 'id') $query->where('produtos.id', $filtros['filtro_valor']);
            if ($filtros['filtro'] == 'nome') $query->where('produtos.nome', 'LIKE', "%{$filtros['filtro_valor']}%");
        }

        $items = $query->paginate(15, $this->colunas());

        $dados = $items->transform(function ($item) {
            return $this->dado($item);
        });

        return ['dados' => $dados, 'paginate' => ['current' => $items->currentPage(), 'last_page' => $items->lastPage(), 'total' => $items->total()]];
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

    /**
     * @deprecated
     */
    public function atualizarEstoqueLocal($id, $valor)
    {
        $produto = $this->newQuery()
            ->find($id)
            ->increment('estoque_local', $valor);

        (new ProdutosHistoricos())->create($produto, (new ProdutosStatus())->local(), $valor, id_usuario_atual());
    }

    public function subtrairEstoque($idPedido, $idProduto, $qtd)
    {
        $this->newQuery()->find($idProduto)
            ->decrement('estoque_local', $qtd);

        (new ProdutosEstoquesHistoricos())->createSaida($idPedido, $idProduto, $qtd);
    }

    public function getProdutosFormulario($request)
    {
        $categorias = (new ProdutosCategorias())->getNomes();
        $fornecedores = (new ProdutosFornecedores())->getNomes();
        $unidades = (new ProdutosUnidades())->getNomes();

        $query = $this->newQuery()
            ->whereIn('categoria_id', (new ProdutosCategoriasUsuarios())->categorias(id_usuario_atual()));

        if ($request->fornecedor) $query->where('fornecedor_id', $request->fornecedor);
        if ($request->categoria) $query->where('categoria', $request->categoria);
        if ($request->unidade) $query->where('unidade', $request->unidade_id);

        $financeiro = is_financeiro();

        return $query->orderBy('nome')
            ->get()
            ->transform(function ($dados) use ($categorias, $fornecedores, $unidades, $financeiro) {
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
                    'estoque_consultor' => 0,
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

    public function updateEstoque(int $id, $estoque)
    {
        $this->newQuery()
            ->find($id)
            ->increment('estoque_local', $estoque);
    }

    public function get($setor = null)
    {
        return $this->newQuery()
            ->where($setor ? ['setor_id' => $setor] : null)
            ->get();
    }
}
