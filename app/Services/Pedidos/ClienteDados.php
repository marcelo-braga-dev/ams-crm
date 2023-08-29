<?php

namespace App\Services\Pedidos;

class ClienteDados
{
    public function dados($pedido, $leads, $clientes, $pedidoCliente): array
    {
        $cliente = [];
        if ($pedido->modelo == 1) {
            $cliente = [
                'nome' => $pedidoCliente[$pedido->id]['nome'] ?? ''
            ];
        } else if ($pedido->modelo == 2) {
            $cliente = [
                'nome' => ($leads[$pedido->lead] ?? $clientes[$pedido->cliente]),
            ];
        }
        return $cliente;
    }
}
