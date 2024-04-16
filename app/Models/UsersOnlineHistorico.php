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

        $items = (new User())->usuarios(false, false);

        $usuarios = [];
        foreach ($items as $item) {
            $usuarios[$item['id']] = $item;
        }

        return $this->newQuery()
            ->where('data', '>=', $intervalo)
            ->groupBy('user_id')
            ->orderBy('id')
            ->get()
            ->transform(function ($item) use ($usuarios) {
                return array_merge($usuarios[$item->user_id], ['ultimo_login' => date('d/m/y H:i', strtotime($item->data))]);
            });
    }

    public function tempoOnline($mes)
    {
        $nomes = (new User())->getNomes();

        $items = $this->newQuery()
            ->whereMonth('created_at', $mes)
            ->groupBy(DB::raw('user_id, DAY(created_at)'))
            ->select(DB::raw('COUNT(id) as qtd, user_id, DAY(created_at) as dia, MONTH(created_at) as mes'))
            ->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'id' => $item->user_id,
                    'nome' => $nomes[$item->user_id] ?? '',
                    'qtd' => $item->qtd,
                    'min' => ($item->qtd / 2),
                    'horas' => ($item->qtd / 2) / 60,
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
