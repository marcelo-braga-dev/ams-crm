<?php

namespace App\src\Pedidos\Arquivos;

class ChavesArquivosPedidos
{
    private string $cpf = 'cpf';
    private string $rg = 'rg';
    private string $cnh = 'cnh';
    private string $cnpj = 'cnpj';

    public function cpf(): string
    {
        return $this->cpf;
    }

    public function rg(): string
    {
        return $this->rg;
    }

    public function cnh(): string
    {
        return $this->cnh;
    }

    public function cnpj(): string
    {
        return $this->cnpj;
    }
}