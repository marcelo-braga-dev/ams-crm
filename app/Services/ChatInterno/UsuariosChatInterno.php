<?php

namespace App\Services\ChatInterno;

use App\Models\User;

class UsuariosChatInterno
{
    public function usuarios()
    {
        $dados = (new User())->chatInterno();

        $items = [];
        foreach ($dados as $dado) {
            $items[] = $this->dados($dado);
        }
        return $items;
    }

    private function dados($dado)
    {
        return [
            'id' => $dado->id,
            'nome' => $dado->name,
            'setor' => $this->nomeSetores[$dado->setor] ?? '',
            'email' => $dado->email,
            'tipo' => $dado->tipo,
            'status' => $dado->status,
            'foto' => $dado->foto ? asset('storage/' . $dado->foto) : null,
            'ultimo_login' => $dado->ultimo_login ? date('d/m/y H:i', strtotime($dado->ultimo_login)) : '',
            'logado' =>  strtotime(now()) - strtotime($dado->ultimo_login) < 61 ? 1 : 0,
        ];
    }
}
