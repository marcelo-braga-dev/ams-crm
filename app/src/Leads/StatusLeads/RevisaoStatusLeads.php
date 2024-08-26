<?php

namespace App\src\Leads\StatusLeads;

class RevisaoStatusLeads implements StatusLeadsInterface
{
    private string $status = 'revisao';
    private string $statusNome = 'Revisão';
    private int $statusPrazo = 0;
    private string $statusCor = 'brown';

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
}
