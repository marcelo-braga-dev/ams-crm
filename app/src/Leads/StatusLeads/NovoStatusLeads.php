<?php

namespace App\src\Leads\StatusLeads;

class NovoStatusLeads implements StatusLeadsInterface
{
    private string $status = 'novo';
    private string $statusNome = 'Novos';
    private int $statusPrazo = 0;
    private string $statusCor = '#41D310E2';

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
            'status' => $this->status,
            'nome' => $this->statusNome,
            'cor' => $this->statusCor,
        ];
    }

    public function permissoes(): array
    {
        // TODO: Implement permissoes() method.
    }
}
