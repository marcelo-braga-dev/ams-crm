<?php

namespace App\Services\Chamados;

use App\Models\Sac;

class CardsService
{
    public function cards()
    {
        $items = (new Sac)->cards();

        return $this->status($items);
    }

    public function cardsIntegrador()
    {
        $items = (new Sac)->cardsIntegrador();

        return $this->status($items);
    }

    private function status($items): array
    {
        $cards = [];
        $cards['novo'] = [...$items->where('status', 'novo')];
        $cards['atendimento'] = [...$items->where('status', 'atendimento')->where('avaria', 0)];
        $cards['avaria'] = [...$items->where('status', 'atendimento')->where('avaria', 1)];
        $cards['finalizado'] = [...$items->where('status', 'finalizado')];

        return $cards;
    }
}
