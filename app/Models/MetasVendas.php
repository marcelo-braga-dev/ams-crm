<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MetasVendas extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'ano',
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
    ];

    public function createOrUpdate($id, $dados)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['users_id' => $id],
                [
                    'ano' => 2023,
                    'jan' => convert_money_float($dados->jan),
                    'fev' => convert_money_float($dados->fev),
                    'mar' => convert_money_float($dados->mar),
                    'abr' => convert_money_float($dados->abr),
                    'mai' => convert_money_float($dados->mai),
                    'jun' => convert_money_float($dados->jun),
                    'jul' => convert_money_float($dados->jul),
                    'ago' => convert_money_float($dados->ago),
                    'set' => convert_money_float($dados->set),
                    'out' => convert_money_float($dados->out),
                    'nov' => convert_money_float($dados->nov),
                    'dez' => convert_money_float($dados->dez),
                ]
            );
    }

    public function metas()
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado->users_id] = $dado->meta;
        }
        return $metas;
    }

    public function metasConsultores()
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado['users_id']] = $dado;
        }
        return $metas;
    }

    public function metasConsultoresPeriodo()
    {
        $dados = $this->newQuery()
            ->select('users_id', DB::raw(
                '(jan + fev + mar + abr + mai + jun) as sem_1,
                (jul + ago + `set` + `out` + nov + dez) as sem_2'
            ))
            ->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado['users_id']] = [
                'sem_1' => $dado->sem_1 ?? 0,
                'sem_2' => $dado->sem_2 ?? 0,
                'total' => $dado->sem_1 + $dado->sem_2,
            ];
        }

        return $metas;
    }

    public function getMeta($id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->first();
    }
}
