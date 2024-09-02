<?php

namespace App\src\Leads\StatusLeads;

interface StatusLeadsInterface
{
    public function setStatus(): void;

    public function setStatusNome(): void;

    public function setStatusPrazo(): void;

    public function setPermissoes(): void;

    public function setStatusCor(): void;

    public function updateStatus($id): void;

    public function emitePedidos(): bool;
}
