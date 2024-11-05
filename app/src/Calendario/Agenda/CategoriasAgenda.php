<?php

namespace App\src\Calendario\Agenda;

class CategoriasAgenda
{
    public function getNomes(): array
    {
        return [
            'reuniao' => 'Reunião',
            'visita' => 'Visita',
            'anotacoes' => 'Anotações',
        ];
    }
}
