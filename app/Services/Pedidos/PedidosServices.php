<?php

namespace App\Services\Pedidos;

use App\Models\Fornecedores;
use App\Models\Integradores;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\User;
use App\src\Pedidos\StatusPedidos;
use DateTime;

/**
 * @deprecated
 */
class PedidosServices
{
    public array $clientes = [];
    public array $usuarios = [];
    public array $fornecedores = [];
    public array $integradores = [];

    public function __construct()
    {
        $this->clientes = (new PedidosClientes())->dados();
        $this->usuarios = (new User())->getNomes();
        $this->fornecedores = (new Fornecedores())->getNomeFornecedores();
        $this->integradores = (new Integradores())->getNomeIntegradores();
    }

    /**
     * @deprecated
     */
    public function pedido($dados): array
    {
        return [
            'id' => $dados->id,
            'id_consultor' => $dados->users_id,
            'nome' => $this->usuarios[$dados->users_id],
            'cliente' => $this->clientes[$dados->id]['nome'],
            'data' => date('d/m/y H:i', strtotime($dados->status_data)),
            'prazo' => date('d/m/y H:i', strtotime("+$dados->prazo days", strtotime($dados->status_data))),
            'prazo_atrasado' => $this->getDiferenca($dados->status_data, $dados->prazo),
            'prazoDias' => $dados->prazo,
            'status' => (new StatusPedidos())->getNomeStatus($dados->status),
            'preco' => convert_float_money($dados->preco_venda),
            'preco_float' => $dados->preco_venda,
            'fornecedor' => $this->fornecedores[$dados->fornecedor],
            'integrador' => $this->integradores[$dados->integrador]['nome'] ?? '-',
            'integrador_cnpj' => $this->integradores[$dados->integrador]['cnpj'] ?? '-',
            'obs' => $dados->obs,
            'situacao' => $dados->situacao,
            'email' => $this->clientes[$dados->id]['email'],
            'telefone' => $this->clientes[$dados->id]['telefone'],
            'nascimento' => $this->clientes[$dados->id]['nascimento'],
            'info_pedido' => $dados->info_pedido,
            'endereco' => $this->clientes[$dados->id]['endereco'],
            'forma_pagamento' => $dados->forma_pagamento
        ];
    }

    public function pedidoCard($dados): array
    {
        return [
            //'id' => $dados->id,
            //'nome' => $this->usuarios[$dados->users_id],
            //'cliente' => $this->clientes[$dados->id]['nome'],
            //'data' => date('d/m/y H:i', strtotime($dados->status_data)),
            //'prazo' => date('d/m/y H:i', strtotime("+$dados->prazo days", strtotime($dados->status_data))),
            //'prazo_atrasado' => $this->getDiferenca($dados->status_data, $dados->prazo),
            //'prazoDias' => $dados->prazo,
            //'status' => (new StatusPedidos())->getNomeStatus($dados->status),
            //'preco' => convert_float_money($dados->preco_venda),
            //'fornecedor' => $this->fornecedores[$dados->fornecedor],
            //'integrador' => $this->integradores[$dados->integrador]['nome'] ?? '-',
            //'alerta' => $dados->obs,
            //'pin' => $dados->pin,
            //'sac' => $dados->sac,
            //'situacao' => $dados->situacao,
            //'email' => $this->clientes[$dados->id]['email'],
            //'telefone' => $this->clientes[$dados->id]['telefone'],
        ];
    }

    public function pedidos()
    {
        $pedidosAll = (new Pedidos())->newQuery()->orderByDesc('id')->get();

        $pedidos = [];
        foreach ($pedidosAll as $dados) {
            $pedidos[] = $this->pedido($dados);
        }
        return $pedidos;
    }

    public function pedidosUsuario(int $id): array
    {
        $pedidosAll = (new Pedidos())->newQuery()
            ->where('users_id', $id)->orderByDesc('id')->get();

        $pedidos = [];
        foreach ($pedidosAll as $dados) {
            $pedidos[] = $this->pedido($dados);
        }
        return $pedidos;
    }

    private function getDiferenca(mixed $prazoData, int $prazoLimite): ?int
    {
        $entrada = new DateTime(now());
        $saida = new DateTime(date('Y-m-d H:i:s', strtotime("+$prazoLimite days", strtotime($prazoData))));

        return $saida->diff($entrada)->invert ? null : 1;
    }
}
