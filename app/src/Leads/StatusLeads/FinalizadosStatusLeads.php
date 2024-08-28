<?php

namespace App\src\Leads\StatusLeads;

class FinalizadosStatusLeads implements StatusLeadsInterface
{
    private string $status = 'finalizado';
    private string $statusNome = 'Finalizados';
    private int $statusPrazo = 0;
    private string $statusCor = 'black';

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
