<?php

namespace App\src\Calendario\Agenda\Status;

class StatusAgenda
{
    public function nomesStatus(): array
    {
        return [
            'novo' => 'Em Aberto',
            'confirmado' => 'Confirmado Presença',
            'nao_participarei' => 'Não Participarei',
            'finalizado' => 'Finalizado',
        ];
    }

    public function statusConvidado()
    {
        return [
            ['status' => 'confirmado', 'nome' => 'Participarei',],
            ['status' => 'nao_participarei', 'nome' => 'Não Participarei']
        ];
    }
}
