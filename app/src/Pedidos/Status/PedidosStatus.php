<?php

namespace App\src\Pedidos\Status;

interface PedidosStatus
{
    function getStatus(): string;
    function getNomeStatus(): string;
    function getPrazo(): int;
    function updateStatus($id, $alerta = null);
}
