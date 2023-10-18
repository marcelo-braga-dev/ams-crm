<?php

namespace App\src\Pedidos\Notificacoes\Pedidos;

use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\Notificacao;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;

class PedidosAdminsNotificar implements Notificacao
{
    public function getCategoria(): string
    {
        return (new NotificacoesCategorias())->pedidos();
    }

    public function notificar($idPedido, string $status):void
    {
        $titulo = 'Pedido n. ' . $idPedido . ' - '. $status . '.';
        $msg = 'Pedido n. ' . $idPedido . ' foi alterado seu status para ' . $status . '.';

        (new Notificacoes())->notificarPedidoAdmins($idPedido, $this->getCategoria(), $titulo, $msg);
    }
}
