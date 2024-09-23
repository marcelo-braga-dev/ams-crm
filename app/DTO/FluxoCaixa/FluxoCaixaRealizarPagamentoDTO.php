<?php

namespace App\DTO\FluxoCaixa;

use Illuminate\Http\UploadedFile;

class FluxoCaixaRealizarPagamentoDTO
{
    public ?int $bancoId;
    public ?string $valorBaixa;
    public ?string $dataBaixa;
    public ?string $formaPagamento;
    public ?UploadedFile $anexo;

    public function __construct($bancoId = null, $valorBaixa = null, $dataBaixa = null, $formaPagamento = null, $anexo = null)
    {
        $this->bancoId = $bancoId;
        $this->valorBaixa = $valorBaixa;
        $this->dataBaixa = $dataBaixa;
        $this->formaPagamento = $formaPagamento;
        $this->anexo = $anexo;
    }

    // Método para criar o DTO a partir de um array
    public static function fromArray($data): FluxoCaixaRealizarPagamentoDTO
    {
        return new self(
            $data['banco_id'] ?? null,
            $data['valor_baixa'] ?? null,
            $data['data_baixa'] ?? null,
            $data['forma_pagamento'] ?? null,
            $data['anexo'] ?? null
        );
    }

    // Método para converter o DTO em array
    public function toArray(): array
    {
        return [
            'user_id' => id_usuario_atual(),
            'banco_id' => $this->bancoId,
            'valor_baixa' => $this->valorBaixa,
            'data_baixa' => $this->dataBaixa,
            'forma_pagamento' => $this->formaPagamento,
            'anexo' => $this->anexo,
        ];
    }
}
