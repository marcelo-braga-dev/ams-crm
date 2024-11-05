<?php

namespace App\src\Orcamentos;

class EstruturasGeradores
{
    public function estruturas(): array
    {
        return [
            1 => 'COLONIAL',
            2 => 'FIBROMADEIRA',
            3 => 'FIBROMETAL',
            4 => 'FIBROMETAL ROSCA DUPLA',
            5 => 'LAJE',
            6 => 'METÁLICO',
            7 => 'SOLO',
            8 => 'S/ESTRUTURA'
        ];
    }

    public function estruturasNomesId(): array
    {
        return [
            ['id' => 1, 'nome' => 'COLONIAL'],
            ['id' => 2, 'nome' => 'FIBROMADEIRA'],
            ['id' => 3, 'nome' => 'FIBROMETAL'],
            ['id' => 4, 'nome' => 'FIBROMETAL ROSCA DUPLA'],
            ['id' => 5, 'nome' => 'LAJE'],
            ['id' => 6, 'nome' => 'METÁLICO'],
            ['id' => 7, 'nome' => 'SOLO'],
            ['id' => 8, 'nome' => 'S/ESTRUTURA']
        ];
    }

    public function estruturasId(): array
    {
        return [
            'COLONIAL' => 1,
            'FIBROMADEIRA' => 2,
            'FIBROMETAL' => 3,
            'FIBROMETAL ROSCA DUPLA' => 4,
            'LAJE' => 5,
            'METALICO' => 6,
            'SOLO' => 7,
            'S/ESTRUTURA' => 8,
        ];
    }
}
