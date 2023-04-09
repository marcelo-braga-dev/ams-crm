<?php

namespace App\Services\Usuarios;

use App\Models\Setores;
use App\Models\User;

class DadosUsuariosService
{
    private array $setores;

    public function __construct()
    {
        $this->setores = (new Setores())->nomes();
    }

    public function usuario($id): array
    {
        $dados = (new User())->find($id);

        return $this->dados($dados);
    }

    public function transformar($usuarios):array
    {
        $items = [];
        foreach ($usuarios as $usuario) {
            $items[] = $this->dados($usuario);
        }
        return $items;
    }

    private function dados($dados) :array
    {
        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'status' => $dados->status,
            'tipo' => $dados->tipo,
            'setor' => $dados->setor,
            'setor_nome' => $this->setores[$dados->setor]['nome'] ?? null,
            'foto' => $this->foto($dados->foto)
        ];
    }

    private function foto($foto)
    {
        return $foto ? asset('storage/' . $foto) : null;
    }
}
