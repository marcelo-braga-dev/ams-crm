<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersFuncoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'is_admin'
    ];

    public function getAll()
    {
        return $this->newQuery()
            ->get(['id', 'nome', 'is_admin as admin']);
    }

    public function find($id)
    {
        $permissoes = (new UsersFuncoesPermissoes())->newQuery()->get();
        return $this->newQuery()
            ->leftJoin('users_funcoes_permissoes', 'users_funcoes.id', '=', 'users_funcoes_permissoes.funcoes_id')
            ->find($id, ['users_funcoes.id', 'users_funcoes.nome', 'users_funcoes.is_admin']);
    }

    public function create($dados)
    {
        $funcao = $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'is_admin' => $dados->is_admin === 'admin'
            ]);

        (new UsersFuncoesPermissoes())->atualizar($funcao->id, $dados->permissoes);
    }

    private function dados($item)
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'is_admin' => $item->is_admin,
        ];
    }
}
