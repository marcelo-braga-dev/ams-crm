<?php

namespace App\src\Pedidos;

class NotificacoesCategorias
{
    private string $pedidos = 'pedidos';
    private string $leads = 'leads';

    public function pedidos(): string
    {
        return $this->pedidos;
    }

    public function leads(): string
    {
        return $this->leads;
    }
}
