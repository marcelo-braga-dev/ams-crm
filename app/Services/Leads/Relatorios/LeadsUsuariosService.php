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
            $dados[$lead->users_id]['status'][$lead->status][] = [];
            $dados[$lead->users_id]['nome'] = $nomes[$lead->users_id] ?? 'Não Encontrado';
            $dados[$lead->users_id]['id'] = $lead->users_id;
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
