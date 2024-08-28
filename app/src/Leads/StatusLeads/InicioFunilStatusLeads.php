<?php

namespace App\src\Leads\StatusLeads;

class InicioFunilStatusLeads implements StatusLeadsInterface
{
    private string $status = 'inicio_funil';
    private string $statusNome = 'Inicio Funil';
    private int $statusPrazo = 0;
    private string $statusCor = 'purple';

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
