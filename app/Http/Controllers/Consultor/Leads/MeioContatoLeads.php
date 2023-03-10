<?php

namespace App\Http\Controllers\Consultor\Leads;

class MeioContatoLeads
{
    public function getStatus()
    {
        return [
            'whatsapp' => 'Whatsapp',
            'email' => 'Email',
            'ligacao' => 'Ligação Telefônica',
            'redes_sociais' => 'Redes Sociais',
            'ads' => 'ADS',
            'drop' => 'DROP'
        ];
    }

    public function status(): array
    {
        return [
            ['key' => 'whatsapp', 'nome' => 'Whatsapp'],
            ['key' => 'email', 'nome' => 'Email'],
            ['key' => 'ligacao', 'nome' => 'Ligação Telefônica'],
            ['key' => 'redes_sociais', 'nome' => 'Redes Sociais'],
            ['key' => 'ads', 'nome' => 'ADS'],
        ];
    }

    public function getStatusNomes(): array
    {
        $status = [];
        foreach ($this->status() as $item) {
            $status[$item['key']] = $item['nome'];
        }
        return $status;
    }
}
