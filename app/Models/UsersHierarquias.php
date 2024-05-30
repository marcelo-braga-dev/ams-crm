<?php

namespace App\Models;

use App\src\Usuarios\Status\AtivoStatusUsuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersHierarquias extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'superior_id'
    ];

    public function idSupervisonados($id)
    {
        return $this->newQuery()
            ->where('superior_id', $id)
            ->pluck('superior_id', 'user_id');
    }

    public function atualizar($id, $dados)
    {
        $query = $this->newQuery();

        $query->where('superior_id', $id)
            ->delete();

        foreach ($dados as $idSup => $item) {
            if ($item) $query->create(['user_id' => $idSup, 'superior_id' => $id]);
        }
    }

    public function supervisionados($id, $ativos = false)
    {
        $query = $this->newQuery()
            ->where('users_hierarquias.superior_id', $id);

        if ($ativos) $query->join('users', 'users.id', '=', 'users_hierarquias.user_id')
            ->where('users.status', (new AtivoStatusUsuario())->getStatus());

        $dados = $query->get('user_id')
            ->transform(function ($item) {
                return $item->user_id;
            })->toArray();

        return array_merge($dados, [$id]);
    }
}
