<?php

namespace App\DTO\FluxoCaixa;

class FluxoCaixaPagamentoDTO
{
    public string $valor;
    public string $data;
    public ?int $bancoId;
    public ?string $valorBaixa;
    public ?string $dataBaixa;
    public ?string $formaPagamento;
    public $anexo;

    public function __construct($valor, $data, $bancoId = null, $valorBaixa = null, $dataBaixa = null, $formaPagamento = null, $anexo = null)
    {
        $this->valor = $valor;
        $this->data = $data;
        $this->bancoId = $bancoId;
        $this->valorBaixa = $valorBaixa;
        $this->dataBaixa = $dataBaixa;
        $this->formaPagamento = $formaPagamento;
        $this->anexo = $anexo;
    }

    // Método para criar o DTO a partir de um array
    public static function fromArray($data)
    {
        return new self(
            $data['valor'] ?? null,
            $data['data'] ?? null,
            $data['banco_id'] ?? null,
            $data['valor_baixa'] ?? null,
            $data['data_baixa'] ?? null,
            $data['forma_pagamento'] ?? null,
            $data['anexo'] ?? null
        );
    }

    // Método para converter o DTO em array
    public function toArray()
    {
        return [
            'user_id' => id_usuario_atual(),
            'valor' => $this->valor,
            'data' => $this->data,
            'banco_id' => $this->bancoId,
            'valor_baixa' => $this->valorBaixa,
            'data_baixa' => $this->dataBaixa,
            'forma_pagamento' => $this->formaPagamento,
            'anexo' => $this->anexo,
        ];
    }
}
