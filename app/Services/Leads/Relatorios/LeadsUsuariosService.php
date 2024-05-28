<?php

namespace App\Services\Leads\Relatorios;

use App\Models\Leads;
use App\Models\User;

class LeadsUsuariosService
{
    public function get($setor = null)
    {
        $nomes = (new User())->getNomes();

        $qtd = [];
        foreach (supervisionados(id_usuario_atual(), true) as $id) {
            $qtd[] = [
                'id' => $id,
                'nome' => $nomes[$id],
                'status' => (new Leads())->qtdLeadsUsuarios($id, $setor)];
        }

        return $qtd;
    }
}
