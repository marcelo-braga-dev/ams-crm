<?php

namespace App\Services\Usuarios;

use App\Models\Setores;
use App\Models\User;

class UsuariosService
{
    private $nomeSetores;

    public function __construct()
    {
        $this->nomeSetores = (new Setores())->getNomes();
    }

    public function usuario(int $id)
    {
        $dado = (new User())->find($id);

        return $this->dados($dado);
    }

    public function usuarios()
    {
        $dados = (new User())->usuarios();

        $items = [];
        foreach ($dados as $dado) {
            $items[] = $this->dados($dado);
        }
        print_pre($items);
        return $items;
    }

    public function ativos($exceto = null, $setor = null, $superiores = false)
    {
        $dados = (new User())->getAll($exceto, $setor, $superiores);

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
            'franquia' => $dado->franquia,
            'setor' => $this->nomeSetores[$dado->setor] ?? '',
            'email' => $dado->email,
            'funcao_id' => $dado->funcao_id,
            'status' => $dado->status,
            'foto' => $dado->foto ? asset('storage/' . $dado->foto) : null,
            'ultimo_login' => $dado->ultimo_login ? date('d/m/y H:i', strtotime($dado->ultimo_login)) : '',
            'logado' =>  strtotime(now()) - strtotime($dado->ultimo_login) < 61 ? 1 : 0,
        ];
    }
}
