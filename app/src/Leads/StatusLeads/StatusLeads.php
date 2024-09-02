<?php

namespace App\src\Leads\StatusLeads;

abstract class StatusLeads implements StatusLeadsInterface
{
    protected string $status;
    protected string $statusNome;
    protected int $statusPrazo = 0;
    protected string $statusCor;
    protected string $urlStatus;

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
            'limite_dias' => $this->statusPrazo,
            'url_avancar_status' => $this->urlStatus,
        ];
    }

    public function permissoes(): array
    {
        return [];
    }
}
