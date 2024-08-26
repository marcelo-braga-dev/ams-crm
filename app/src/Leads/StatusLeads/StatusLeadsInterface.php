<?php

namespace App\src\Leads\StatusLeads;

interface StatusLeadsInterface
{
    public function status(): string;

    public function statusNome(): string;

    public function statusPrazo(): ?int;

    public function statusDados(): array;
}
