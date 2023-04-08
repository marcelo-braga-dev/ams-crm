<?php

namespace App\Services\Usuarios;

use App\Models\Setores;
use App\Models\User;

class DadosUsuariosService
{
    public function get($id)
    {
        $dados = (new User())->find($id);
        $setores = (new Setores())->nomes();

        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'status' => $dados->status,
            'tipo' => $dados->tipo,
            'setor' => $dados->setor,
            'setor_nome' => $setores[$dados->setor]['nome'] ?? null,
            'foto' => (new User())->getFoto($id)
        ];
    }
}
