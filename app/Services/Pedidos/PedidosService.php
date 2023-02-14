<?php

namespace App\Services\Pedidos;

use App\Models\Pedidos;

class PedidosService
{
    public function todosPedidos()
    {
        $pedidos = (new Pedidos())->pedidos();

        $dados = [];
        foreach ($pedidos as $pedido) {
            $dados[] =  (new DadosPedidoServices())->dados($pedido);
        }

        return $dados;
    }
}
