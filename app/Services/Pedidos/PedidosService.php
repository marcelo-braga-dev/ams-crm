<?php

namespace App\Services\Pedidos;

use App\Models\Pedidos;

class PedidosService
{
    public function todosPedidos()
    {
        $pedidos = (new Pedidos())->pedidos();
        return $this->dados($pedidos);
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
}
