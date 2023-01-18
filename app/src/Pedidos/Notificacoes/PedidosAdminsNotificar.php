<?php

namespace App\src\Pedidos\Notificacoes;

use App\Models\Notificacoes;

class PedidosAdminsNotificar
{
    private $categoria = 'pedidos';

    public function getCategoria(): string
    {
        return $this->categoria;
    }

    public function notificar($idPedido, string $status)
    {
        $titulo = 'Pedido n. ' . $idPedido . ' - '. $status . '.';
        $msg = 'Pedido n. ' . $idPedido . ' foi alterado seu status para ' . $status . '.';
        $url = null;

        (new Notificacoes())->notificarAdmins($idPedido, $this->getCategoria(), $titulo, $msg);
    }
}
