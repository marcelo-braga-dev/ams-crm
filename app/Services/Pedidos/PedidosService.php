<?php

namespace App\Services\Pedidos;

use App\Models\Leads;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\User;
use App\src\Pedidos\StatusPedidos;

class PedidosService
{
    public function todosPedidos(?int $setor = null)
    {
        return (new Pedidos())->get($setor);
    }

    public function pedidosConsultor()
    {
        $pedidos = (new Pedidos())->pedidosUsuario();
        return $this->dados($pedidos);
    }

    private function dados($pedidos)
    {
        $dados = [];
        foreach ($pedidos as $pedido) {
            $dados[] = (new DadosPedidoServices())->dados($pedido);
        }
        return $dados;
    }

    public function historicoDados(): array
    {
        $pedidos = (new Pedidos())->pedidosUsuario();

        $dados = [];
        $nomes = (new User())->getNomes();
        $nomesLeads = (new Leads())->getNomes();
        $nomesClientes = (new PedidosClientes())->getNomes();

        foreach ($pedidos as $item) {
            $dados[] = [
                'id' => $item->id,
                'cliente' => $nomesClientes[$item->id] ?? '',
                'consultor' => $nomes[$item->users_id] ?? '',
                'integrador' => $nomesLeads[$item->integrador] ?? '',
                'preco' => convert_float_money($item->preco_venda),
                'status' => (new StatusPedidos())->getNomeStatus($item->status),
                'data' => convert_data($item->created_at),
            ];
        }
        return $dados;
    }
}
