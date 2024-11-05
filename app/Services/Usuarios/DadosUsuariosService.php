<?php

namespace App\Services\Usuarios;

use App\Models\Franquias;
use App\Models\Setores;
use App\Models\User;

/**
 * @deprecated
 */
class DadosUsuariosService
{
    private array $setores;
    private $franquias;

    public function __construct()
    {
        $this->setores = (new Setores())->getNomes();
        $this->franquias = (new Franquias())->getNomes();
    }

    public function usuario($id): array
    {
        $dados = (new User())->find($id);

        return $this->dados($dados);
    }

    public function transformar($usuarios): array
    {
        $items = [];
        foreach ($usuarios as $usuario) {
            $items[] = $this->dados($usuario);
        }
        return $items;
    }

    private function dados($dados): array
    {
        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'status' => $dados->status,
            'funcao_id' => $dados->funcao_id,
            'setor_id' => $dados->setor_id,
            'setor_nome' => $this->setores[$dados->setor_id]['nome'] ?? null,
            'franquia' => $this->franquias[$dados->franquia_id],
            'foto' => $this->foto($dados->foto)
        ];
    }

    private function foto($foto)
    {
        return $foto ? asset('storage/' . $foto) : null;
    }
}
