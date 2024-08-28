<?php

namespace App\src\Leads\StatusLeads;

class InativoStatusLeads implements StatusLeadsInterface
{
    private string $status = 'inativo';
    private string $statusNome = 'Inativos';
    private int $statusPrazo = 0;
    private string $statusCor = 'gray';

    public function status(): string
    {
        return $this->status;
    }

    public function statusNome(): string
    {
        return $this->statusNome;
    }

    public function statusPrazo(): ?int
    {
        return $this->statusPrazo;
    }

    public function statusDados(): array
    {
        return [
            'nome' => $this->statusNome,
            'status' => $this->status,
            'cor' => $this->statusCor
        ];
    }

    public function permissoes(): array
    {
        // TODO: Implement permissoes() method.
    }
}
