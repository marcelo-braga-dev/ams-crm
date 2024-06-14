<?php

namespace App\Services\Chamados;

use App\Models\Sac;

class CardsService
{
    public function cards()
    {
        $items = (new Sac)->cards();

        $cards = [];
        $cards['novo'] = [...$items->where('status', 'novo')];
        $cards['atendimento'] = [...$items->where('status', 'atendimento')->where('avaria', 0)];
        $cards['avaria'] = [...$items->where('status', 'atendimento')->where('avaria', 1)];
        $cards['finalizado'] = [...$items->where('status', 'finalizado')];

        return $cards;
    }
}
