<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MetasVendas extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chave',
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

        foreach ($dados as $key => $item) {
            $this->newQuery()
                ->updateOrCreate(
                    ['user_id' => $id, 'chave' => $key],
                    [
                        'ano' => date('Y'),
                        'jan' => convert_money_float($item['jan'] ?? null),
                        'fev' => convert_money_float($item['fev'] ?? null),
                        'mar' => convert_money_float($item['mar'] ?? null),
                        'abr' => convert_money_float($item['abr'] ?? null),
                        'mai' => convert_money_float($item['mai'] ?? null),
                        'jun' => convert_money_float($item['jun'] ?? null),
                        'jul' => convert_money_float($item['jul'] ?? null),
                        'ago' => convert_money_float($item['ago'] ?? null),
                        'set' => convert_money_float($item['set'] ?? null),
                        'out' => convert_money_float($item['out'] ?? null),
                        'nov' => convert_money_float($item['nov'] ?? null),
                        'dez' => convert_money_float($item['dez'] ?? null),
                    ]
                );
        }
    }

    public function metas()
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado->user_id] =
                $dado->jan + $dado->fev + $dado->mar + $dado->abr + $dado->mai + $dado->jun +
                $dado->jul + $dado->ago + $dado->set + $dado->out + $dado->nov + $dado->dez;
        }
        return $metas;
    }

    public function metasConsultores()
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado['user_id']] = $dado;
        }
        return $metas;
    }

    public function metasConsultoresPeriodo()
    {
        $dados = $this->newQuery()
            ->select('user_id', DB::raw(
                '(jan + fev + mar + abr + mai + jun) as sem_1,
                (jul + ago + `set` + `out` + nov + dez) as sem_2'
            ))
            ->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado['user_id']] = [
                'sem_1' => $dado->sem_1 ?? 0,
                'sem_2' => $dado->sem_2 ?? 0,
                'total' => $dado->sem_1 + $dado->sem_2,
            ];
        }

        return $metas;
    }

    public function getMeta($id)
    {
        $dados = $this->newQuery()
            ->where('user_id', $id)
            ->get();

        return [
            'metas' => $dados->where('chave', 'meta')->first(),
            'comissoes' => $dados->where('chave', 'comissao')->first(),
            'bonus' => $dados->where('chave', 'bonus')->first(),
            'comissoes_equipe' => $dados->where('chave', 'comissao_equipe')->first(),
            'bonus_equipe' => $dados->where('chave', 'bonus_equipe')->first(),
        ];
    }
}
