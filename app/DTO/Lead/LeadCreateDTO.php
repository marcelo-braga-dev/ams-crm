<?php

namespace App\DTO\Lead;

class LeadCreateDTO
{
    private ?string $cnpj;
    private ?string $cpf;
    private ?int $vendedorId;
    private int $statusId;
    private int $setorId;

    public function __construct($cnpj, $cpf, $vendedorId, $statusId, $setorId)
    {
        $this->cnpj = $cnpj;
        $this->cpf = $cpf;
        $this->vendedorId = $vendedorId;
        $this->statusId = $statusId;
        $this->setorId = $setorId;
    }

    public static function fromArray($data)
    {
        return new self(
            $data['cnpj'] ?? null,
            $data['cpf'] ?? null,
            $data['vendedor_id'] ?? null,
            $data['status_id'] ?? null,
            $data['setor_id'] ?? null,
        );
    }

    public function toArray()
    {
        return [
            'cnpj' => $this->cnpj,
            'cpf' => $this->cpf,
            'vendedor_id' => $this->vendedorId,
            'status_id' => $this->statusId,
            'setor_id' => $this->setorId,
        ];
    }
}
