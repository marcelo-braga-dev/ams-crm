<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UsersOnlineHistorico extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'data',
        'anotacoes',
    ];

    public function create()
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'data' => now(),
            ]);
    }

    public function usuariosOnline()
    {
        $intervalo = date('Y-m-d H:i:s', (strtotime(now()) - 60));

        return $this->newQuery()
            ->leftJoin('users', 'users_online_historicos.user_id', '=', 'users.id')
            ->leftJoin('setores', 'users.setor_id', '=', 'setores.id')
            ->where('users_online_historicos.data', '>=', $intervalo)
            ->groupBy('users_online_historicos.user_id')
            ->orderBy('users_online_historicos.data')
            ->select(['users.foto as foto', 'users.name as nome', 'users.id as id', 'setores.nome as setor_nome'])
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'setor_nome' => $item->setor_nome,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                ];
            });
    }

    public function tempoOnline($mes)
    {
        $nomes = (new User())->getNomes();

        $items = $this->newQuery()
            ->whereMonth('data', $mes)
            ->select(DB::raw('COUNT(id) as qtd, user_id, DAY(data) as dia, MONTH(data) as mes'))
            ->groupBy(DB::raw('user_id, DAY(created_at)'))
            ->orderBy('data')
            ->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'id' => $item->user_id,
                    'nome' => $nomes[$item->user_id] ?? '',
                    'qtd' => $item->qtd,
                    'min' => ($item->qtd),
                    'horas' => ($item->qtd) / 60,
                    'dia' => $item->dia,
                    'mes' => $item->mes,
                ];
            });

        $res = [];
        foreach ($items as $item) {
            $res[$item['id']][] = $item;
        }

        return [...$res];
    }
}
