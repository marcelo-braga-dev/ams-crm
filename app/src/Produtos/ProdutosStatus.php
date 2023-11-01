<?php

namespace App\src\Produtos;

class ProdutosStatus
{
    private string $transito = 'estoque_transito';
    private string $local = 'estoque_local';
    private string $venda = 'venda';

    public function transito(): string
    {
        return $this->transito;
    }

    public function local(): string
    {
        return $this->local;
    }

    public function venda(): string
    {
        return $this->venda;
    }
}
