<?php

namespace App\Services\Leads\Relatorios;

use App\Models\Leads;
use App\Models\User;

class LeadsUsuariosService
{
    public function get($setor = null)
    {
        $nomes = (new User())->getNomes();
        $leads = (new Leads())->qtdLeadsUsuarios($setor);

        $dados = [];

        // Popula
        foreach ((new User())->getIdsSubordinados(true) as $id) {
            $dados[$id] = [];
            $dados[$id]['status'][] = [];
            $dados[$id]['nome'] = $nomes[$id] ?? 'Não Encontrado';
            $dados[$id]['id'] = $id;
        }

        // Preenche
        foreach ($leads as $lead) {
            $userId = $lead->user_id ?? $lead->sdr_id;
            $dados[$userId]['status'][$lead->status][] = [];
            $dados[$userId]['nome'] = $nomes[$userId] ?? 'Não Encontrado';
            $dados[$userId]['id'] = $lead->user_id ?? $lead->sdr_id;
        }

        $items = [];
        $i = 0;
        // Finaliza
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
