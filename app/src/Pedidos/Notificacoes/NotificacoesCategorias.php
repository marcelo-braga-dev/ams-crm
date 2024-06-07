<?php

namespace App\src\Pedidos\Notificacoes;

class NotificacoesCategorias
{
    private string $pedidos = 'pedidos';
    private string $leads = 'leads';
    private string $sac = 'sac';

    public function pedidos(): string
    {
        return $this->pedidos;
    }

    public function leads(): string
    {
        return $this->leads;
    }
    public function sac(): string
    {
        return $this->sac;
    }
}
