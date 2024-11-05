<?php

namespace App\src\Pedidos;

class SituacaoPedido
{
    public function getNovoTag(): string
    {
        return 'novo';
    }

    public function getAbertoTag(): string
    {
        return 'visualizado';
    }
}
