<?php

namespace App\Services\Leads\Relatorios;

use App\Models\Leads\LeadsANTIGO;
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
                'status' => (new LeadsANTIGO())->qtdLeadsUsuarios($id, $setor)];
        }

        return $qtd;
    }
}
