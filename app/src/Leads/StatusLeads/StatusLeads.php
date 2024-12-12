<?php

namespace App\src\Leads\StatusLeads;

abstract class StatusLeads implements StatusLeadsInterface
{
    protected string $status;
    protected string $statusNome;
    protected int $statusPrazo = 15;
    protected string $statusCor;
    protected string $urlStatus;
    protected string $descricao = '';
    protected bool $emitePedidos = false;

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getStatusNome(): string
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
            'prazo_dias' => $this->statusPrazo(),
            'url_avancar_status' => $this->urlStatus,
            'emite_pedidos' => $this->emitePedidos,
            'descricao' => $this->descricao,
        ];
    }

    public function permissoes(): array
    {
        return [];
    }

    public function emitePedidos(): bool
    {
        return $this->emitePedidos;
    }

    public function getStatusCor()
    {
        return $this->statusCor;
    }
}
