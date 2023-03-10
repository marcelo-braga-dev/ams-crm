<?php

namespace App\Services\Usuarios;

use App\Models\Setores;
use App\Models\User;

class UsuariosService
{
    private $nomeSetores;

    public function __construct()
    {
        $this->nomeSetores = (new Setores())->nomes();
    }

    public function usuario(int $id)
    {
        $dado = (new User())->find($id);

        return $this->dados($dado);
    }
    public function todos($exceto = null)
    {
        $dados = (new User())->getAll($exceto);

        $items = [];
        foreach ($dados as $dado) {
            $items[] = $this->dados($dado);
        }
        return $items;
    }

    public function dados($dado)
    {
        return [
            'id' => $dado->id,
            'nome' => $dado->name,
            'setor' => $this->nomeSetores[$dado->setor],
            'email' => $dado->email,
            'tipo' => $dado->tipo,
            'status' => $dado->status
        ];
    }
}
