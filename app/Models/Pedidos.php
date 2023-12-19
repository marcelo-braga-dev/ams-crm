<?php

namespace App\Models;

use App\Services\Pedidos\DadosPedidoServices;
use App\src\Pedidos\SituacaoPedido;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\StatusPedidos;
use App\src\Usuarios\Supervisores;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Pedidos extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'cliente',
        'superior_id',
        'status',
        'status_data',
        'setor',
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
        'lead',
        'modelo'
    ];

    function create($dados, $idLead = null, $leadUser = null)
    {
        $status = (new ConferenciaStatusPedido())->getStatus();
        $prazo = (new ConferenciaStatusPedido())->getPrazo();
        $isSupervisor = funcao_usuario_atual() == (new Supervisores())->getFuncao();
        try {
            $pedido = $this->newQuery()
                ->create([
                    'users_id' => $isSupervisor ? $leadUser : id_usuario_atual(),
                    'cliente' => $idLead,
                    'superior_id' => $isSupervisor ? id_usuario_atual() : null,
                    'lead' => $idLead,
                    'setor' => setor_usuario_atual(),
                    'status' => $status,
                    'status_data' => now(),
                    'prazo' => $prazo,
                    'preco_venda' => convert_money_float($dados->preco),
                    'forma_pagamento' => $dados->forma_pagamento,
                    'fornecedor' => $dados->fornecedor,
                    'integrador' => $dados->integrador,
                    'info_pedido' => $dados->obs,
                    'modelo' => modelo_usuario()
                ]);
        } catch (QueryException $exception) {
            print_pre($exception->getMessage());
            throw new \DomainException('Falha no cadastro do pedido.');
        }
        $consultor = $dados->integrador ?? $idLead;

        (new PedidosHistoricos())->create($pedido->id, $status, $prazo, null);
        (new LeadsHistoricos())->createPedido($consultor, $pedido->id);

        return $pedido->id;
    }

    public function pedidos(?int $setor)
    {
        $query = $this->newQuery();

        if ($setor) $query->where('setor', $setor);
        if (is_supervisor()) $query->whereIn('users_id', (new User())->getIdsConsultoresSupervisor());

        return $query->orderByDesc('id')->get();
    }

    public function pedidosUsuario()
    {
        return $this->newQuery()
            ->where('users_id', id_usuario_atual())
            ->orderByDesc('id')
            ->get();
    }

    public function getDadosPedido(int $id): array
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
                //'integrador' => $dados->integrador,
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
            ->find($id)
            ->update([
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

            (new PedidosClientes())->remover($cliente->id ?? null);
            (new Enderecos())->remover($cliente->endereco ?? null);
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
        return $this->newQuery()->findOrFail($id);
    }

    public function restaurar($id)
    {
        $dados = (new PedidosHistoricos())->newQuery()
            ->where('pedidos_id', $id)
            ->orderByDesc('id')
            ->get()[1];

        $this->updateStatus($id, $dados->status, $dados->prazo);
    }

    public function getPedidos($idUsuario, $setorAtual, $fornecedorAtual)
    {
        $query = $this->newQuery();

        if ($idUsuario) $query->where('users_id', $idUsuario);
        if ($setorAtual) $query->where('setor', $setorAtual);
        if ($fornecedorAtual) $query->where('fornecedor', $fornecedorAtual);
        if (is_supervisor()) $query->whereIn('users_id', (new User())->getIdsConsultoresSupervisor());

        return $query->get();
    }

    public function get(?int $setor)
    {
        $query = $this->newQuery();

        if ($setor) $query->where('setor', $setor);
        if (is_supervisor()) $query->whereIn('users_id', (new User())->getIdsConsultoresSupervisor());

        $nomes = (new User())->getNomes();
        $clientes = (new PedidosClientes())->getCardDados();
        $integradores = (new Leads())->getNomes();
        $status = (new StatusPedidos())->getStatus();
        $setorNomes = (new Setores())->getNomes();
        $leads = (new Leads())->getNomes();

        return $query->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $integradores, $status, $clientes, $setorNomes, $leads) {
                return [
                    'id' => $item->id,
                    'status' => $status[$item->status] ?? '-',
                    'cliente' => ($clientes[$item->id]['nome'] ?? null) ?? ($leads[$item->cliente] ?? null),
                    'consultor' => $nomes[$item->users_id] ?? '-',
                    'integrador' => $integradores[$item->integrador] ?? '-',
                    'preco' => convert_float_money($item->preco_venda),
                    'setor' => $setorNomes[$item->setor] ?? '',
                    'data' => date('d/m/y H:i', strtotime($item->status_data)),
                ];
            });
    }
}
