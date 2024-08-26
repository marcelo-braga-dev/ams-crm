<?php

namespace App\src\Leads\StatusLeads;

class AFazerStatusLeads implements StatusLeadsInterface
{
    private string $status = 'fazer';
    private string $statusNome = 'A Fazer';
    private int $statusPrazo = 0;
    private string $statusCor = 'orange';

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
            'status_nome' => $this->statusNome,
            'status_cor' => $this->statusCor,
        ];
    }
}
