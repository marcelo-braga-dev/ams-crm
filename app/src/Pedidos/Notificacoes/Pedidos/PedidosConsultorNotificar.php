<?php

namespace App\src\Pedidos\Notificacoes\Pedidos;

use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\Notificacao;
use App\src\Pedidos\NotificacoesCategorias;

class PedidosConsultorNotificar implements Notificacao
{
    public function getCategoria(): string
    {
        return (new NotificacoesCategorias())->pedidos();
    }

    public function notificar(int $idPedido, string $status): void
    {
        $titulo = 'Pedido n. ' . $idPedido . ' - ' . $status . '.';
        $msg = 'Pedido n. ' . $idPedido . ' foi alterado seu status para ' . $status . '.';

        (new Notificacoes())->notificarPedidoConsultor($idPedido, $this->getCategoria(), $titulo, $msg);
    }
}
