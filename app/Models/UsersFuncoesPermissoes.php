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
        $this->newQuery()
            ->where('funcoes_id', $id)
            ->delete();

        foreach ($dados as $idPermissao => $dado) {
            if ($dado) $this->newQuery()
                ->create(
                    ['funcoes_id' => $id, 'permissoes_id' => $idPermissao]
                );
        }
    }

    public function get($id)
    {
        return $this->newQuery()
            ->where('funcoes_id', $id)
            ->pluck('funcoes_id', 'permissoes_id');
    }

    public function funcao($id)
    {
        return $dados =  $this->newQuery()
            ->leftJoin('users_funcoes', 'users_funcoes_permissoes.funcoes_id', '=', 'users_funcoes.id')
            ->leftJoin('users_permissoes', 'users_funcoes_permissoes.permissoes_id', '=', 'users_permissoes.id')
            ->where('funcoes_id', $id)
            ->select(DB::raw('
                users_funcoes_permissoes.id as id,
                users_funcoes_permissoes
            '))
            ->get()->toArray();
    }

    public function permissoes($id)
    {
        $dados = $this->newQuery()
            ->where('funcoes_id', $id)
            ->get('permissoes_id');

        $res = [];
        foreach ($dados as $item) {
            $res[] = $item->permissoes_id;
        }

        return $res;
    }
}
