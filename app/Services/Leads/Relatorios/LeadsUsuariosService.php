<?php

namespace App\Services\Leads\Relatorios;

use App\Models\Leads;
use App\Models\User;

class LeadsUsuariosService
{
    public function get()
    {
        $nomes = (new User())->getNomes();
        $leads = (new Leads())->qtdLeadsUsuarios();

        $dados = [];
        foreach ($leads as $lead) {
            $dados[$lead->user_id]['status'][$lead->status][] = [];
            $dados[$lead->user_id]['nome'] = $nomes[$lead->user_id] ?? 'Não Encontrado';
            $dados[$lead->user_id]['id'] = $lead->user_id;
        }

        $items = [];
        $i = 0;
        foreach ($dados as $dado) {
            foreach ($dado['status'] as $index => $item) {
                $items[$i]['nome'] = $dado['nome'];
                $items[$i][$index] = count($item);
                $items[$i]['id'] = $dado['id'];
            }
            $i++;
        }

        return $items;
    }
}
