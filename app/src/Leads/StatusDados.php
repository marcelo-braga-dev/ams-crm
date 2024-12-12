<?php

namespace App\src\Leads;

class StatusDados
{
    public function dados()
    {
        $items = (new StatusLeads())->sequenciaClasses();
        $valores = [];

        foreach ($items as $item) {
            $valores[$item->getStatus()] = [
                'status' => $item->getStatus(),
                'nome' => $item->getStatusNome(),
                'cor' => $item->getStatusCor(),
            ];
        }

        return $valores;
    }

    public function dado(string $status): array
    {
        return $this->dados()[$status] ?? [];
    }
}
