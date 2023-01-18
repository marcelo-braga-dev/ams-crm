<?php

namespace App\src\Pedidos\Notificacoes;

use App\Models\Notificacoes;

class PedidosConsultorNotificar
{
    private $categoria = 'pedidos';

    public function getCategoria(): string
    {
        return $this->categoria;
    }

    public function notificarUpdateStatus(int $idPedido, string $status)
    {
        $titulo = 'Pedido n. ' . $idPedido . ' - '. $status . '.';
        $msg = 'Pedido n. ' . $idPedido . ' foi alterado seu status para ' . $status . '.';
        $url = null;

        (new Notificacoes())->notificarConsultor($idPedido, $this->getCategoria(), $titulo, $msg);
    }
}
