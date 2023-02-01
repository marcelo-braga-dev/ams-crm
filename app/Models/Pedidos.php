<?php

namespace App\Models;

use App\Services\Pedidos\DadosPedidoServices;
use App\src\Pedidos\SituacaoPedido;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

/**
 *  info_pedido
 *      informacoes de pagamento e instalacao
 */
class Pedidos extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'status',
        'status_data',
        'prazo',
        'sac',
        'pin',
        'preco_venda',
        'preco_custo',
        'forma_pagamento',
        'info_pedido',
        'fornecedor',
        'integrador',
        'situacao',
        'obs',
    ];

    function create($dados)
    {
        $prazo = (new ConferenciaStatusPedido())->getPrazo();
        $status = (new ConferenciaStatusPedido())->getStatus();

        try {
            $pedido = $this->newQuery()
                ->create([
                    'users_id' => auth()->id(),
                    'status' => $status,
                    'status_data' => now(),
                    'prazo' => $prazo,
                    'preco_venda' => convert_money_float($dados->preco),
                    'forma_pagamento' => $dados->forma_pagamento,
                    'fornecedor' => $dados->fornecedor,
                    'integrador' => $dados->integrador,
                    'info_pedido' => $dados->obs
                ]);
        } catch (QueryException $exception) {
            throw new \DomainException('Falha no cadastro do pedido.');
        }

        (new PedidosHistoricos())->create($pedido->id, $status, $prazo, null);

        return $pedido->id;
    }

    public function getV2(int $id): array
    {
        $pedidoDados = $this->newQuery()->findOrFail($id);
        return (new DadosPedidoServices())->dados($pedidoDados);
    }

    function updateStatus(int $id, string $status, $prazo, ?string $alerta = null, $situacao = 0)
    {
        $situacao = $situacao == 0 ? (new SituacaoPedido())->getNovoTag() : $situacao;

        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status,
                'status_data' => now(),
                'prazo' => $prazo,
                'situacao' => $situacao,
                'obs' => $alerta
            ]);

        // Historico
        (new PedidosHistoricos())->create($id, $status, $prazo, $alerta);
    }

    public function updateDados(int $id, $dados, $prazo)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'prazo' => $prazo,
                'preco_venda' => convert_money_float($dados->preco),
                'forma_pagamento' => $dados->forma_pagamento,
                'fornecedor' => $dados->fornecedor,
                'integrador' => $dados->integrador,
                'info_pedido' => $dados->obs
            ]);
    }

    public function updateChamado(int $id, int $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update(['sac' => $valor]);
    }

    public function updateSituacao($id, $code)
    {
        $this->newQuery()
            ->find($id)->update([
                'situacao' => $code
            ]);
    }

    public function getPedidosUsuario(int $id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->get();
    }

    public function insertPrecoCusto(int $id, float $precoCusto)
    {
        try {
            $this->newQuery()
                ->find($id)
                ->update(['preco_custo' => $precoCusto]);
        } catch (QueryException $exception) {
            throw new \DomainException('Valor inválido');
        }
    }

    public function updatePrazo(int $id, int $prazo)
    {
        $this->newQuery()
            ->find($id)
            ->update(['prazo' => $prazo]);
    }

    // Dados para os card admin
    public function getDadosCards()
    {
        return $this->newQuery()->get([
            'id', 'users_id', 'status', 'forma_pagamento',
            'status_data', 'sac', 'preco_venda', 'obs',
            'fornecedor', 'integrador', 'situacao', 'prazo'
        ]);
    }

    // Dados para os card do consultor
    public function getDadosCardsConsultor()
    {
        return $this->newQuery()
            ->where('users_id', auth()->id())
            ->get([
                'id', 'users_id', 'status', 'forma_pagamento',
                'status_data', 'sac', 'preco_venda', 'obs',
                'fornecedor', 'integrador', 'situacao', 'prazo'
            ]);
    }

    public function getIdConsultor($id)
    {
        return $this->newQuery()->find($id)->users_id;
    }

    public function remove($id)
    {
        DB::beginTransaction();
        try {
            $pedido = $this->newQuery()->find($id);
            $pedido->delete();

            $cliente = (new PedidosClientes())->getCliente($pedido->id);

            (new PedidosClientes())->remover($cliente->id);
            (new Enderecos())->remover($cliente->endereco);
            (new PedidosChamados())->remover($pedido->id);
            (new PedidosChamadosHistoricos())->remover($pedido->id);
            (new PedidosHistoricos())->remover($pedido->id);
            (new PedidosImagens())->remover($pedido->id);
        } catch (QueryException) {
            DB::rollBack();
        }
        DB::commit();
    }

    public function find($id)
    {
        return $this->newQuery()->find($id);
    }

    public function restaurar($id)
    {
        $dados = (new PedidosHistoricos())->newQuery()
            ->where('pedidos_id', $id)
            ->orderByDesc('id')
            ->get()[1];

        $this->updateStatus($id, $dados->status, $dados->prazo);
    }
}
