<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UsersFuncoesPermissoes extends Model
{
    use HasFactory;

    protected $fillable = ['funcoes_id', 'permissoes_id'];

    public function atualizar($id, $dados)
    {
        foreach ($dados as $idPermissao => $dado) {
            if ($dado) $this->newQuery()
                ->create(
                    ['funcoes_id' => $id, 'permissoes_id' => $idPermissao]
                );
        }
    }

    public function funcao($id)
    {
        return $dados =  $this->newQuery()
            ->leftJoin('users_funcoes', 'users_funcoes_permissoes.funcoes_id', '=', 'users_funcoes.id')
            ->leftJoin('users_permissoes', 'users_funcoes_permissoes.permissoes_id', '=', 'users_permissoes.id')
            ->where('funcoes_id', $id)
            ->select(DB::raw('
                users_funcoes_permissoes.id as id,
                users_funcoes.nome as funcao_nome,
                users_funcoes.id as funcao_id,
                users_permissoes.id as permissao_id,
                users_permissoes.nome as permissao_nome
            '))
            ->get()->toArray();
    }
}
