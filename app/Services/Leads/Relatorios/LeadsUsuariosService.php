<?php

namespace App\Services\Leads\Relatorios;

use App\Models\Leads\Leads;
use App\Models\User;

class LeadsUsuariosService
{
    public function get($setor = null)
    {
        $nomes = (new User())->getNomesAvatar();

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
