<?php

namespace App\src\Pedidos\Arquivos;

class ChavesArquivosPedidos
{
    private string $cpf = 'cpf';
    private string $rg = 'rg';
    private string $cnh = 'cnh';
    private string $cnpj = 'cnpj';
    private string $boleto = 'boleto';
    private string $comprovantePix = 'comprovante_pix';
    private string $comprovanteResidencia = 'comprovante_residencia';
    private string $cheque = 'cheque';

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
    public function boleto(): string
    {
        return $this->boleto;
    }

    public function comprovantePix(): string
    {
        return $this->comprovantePix;
    }

    public function cheque(): string
    {
        return $this->cheque;
    }
    public function residencia(): string
    {
        return $this->comprovanteResidencia;
    }
}
