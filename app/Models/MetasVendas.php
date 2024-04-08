<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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

    public function createOrUpdate($id, $dados, $ano)
    {

        foreach ($dados as $key => $item) {
            if ($key != 'ano')
                $this->newQuery()
                    ->updateOrCreate(
                        ['user_id' => $id, 'chave' => $key, 'ano' => $ano],
                        [
                            'jan' => convert_money_float($item['jan'] ?? null, 3),
                            'fev' => convert_money_float($item['fev'] ?? null, 3),
                            'mar' => convert_money_float($item['mar'] ?? null, 3),
                            'abr' => convert_money_float($item['abr'] ?? null, 3),
                            'mai' => convert_money_float($item['mai'] ?? null, 3),
                            'jun' => convert_money_float($item['jun'] ?? null, 3),
                            'jul' => convert_money_float($item['jul'] ?? null, 3),
                            'ago' => convert_money_float($item['ago'] ?? null, 3),
                            'set' => convert_money_float($item['set'] ?? null, 3),
                            'out' => convert_money_float($item['out'] ?? null, 3),
                            'nov' => convert_money_float($item['nov'] ?? null, 3),
                            'dez' => convert_money_float($item['dez'] ?? null, 3),
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

    public function getMeta($id, $ano)
    {
        $dados = $this->newQuery()
            ->where('user_id', $id)
            ->where('ano', $ano)
            ->get()
            ->transform(function ($item) {
                $casas = 2;
                if ($item->chave == 'comissoes' || $item->chave == 'comissoes_equipe') $casas = 3;
                return [
                    'chave' => $item->chave,
                    'ano' => $item->ano,
                    'jan' => convert_float_money($item->jan, $casas),
                    'fev' => convert_float_money($item->fev, $casas),
                    'mar' => convert_float_money($item->mar, $casas),
                    'abr' => convert_float_money($item->abr, $casas),
                    'mai' => convert_float_money($item->mai, $casas),
                    'jun' => convert_float_money($item->jun, $casas),
                    'jul' => convert_float_money($item->jul, $casas),
                    'ago' => convert_float_money($item->ago, $casas),
                    'set' => convert_float_money($item->set, $casas),
                    'out' => convert_float_money($item->out, $casas),
                    'nov' => convert_float_money($item->nov, $casas),
                    'dez' => convert_float_money($item->dez, $casas),
                ];
            });

        return [
            'metas' => $dados->where('chave', 'metas')->first(),
            'comissoes' => $dados->where('chave', 'comissoes')->first(),
            'bonus' => $dados->where('chave', 'bonus')->first(),
            'comissoes_equipe' => $dados->where('chave', 'comissoes_equipe')->first(),
            'bonus_equipe' => $dados->where('chave', 'bonus_equipe')->first(),
        ];
    }

    public function getMetaMes($id, $mes, $ano)
    {
        $campoMes = [1 => 'jan', 2 => 'fev', 3 => 'mar', 4 => 'abr', 5 => 'mai', 6 => 'jun', 7 => 'jul', 8 => 'ago', 9 => 'set', 10 => 'out', 11 => 'nov', 12 => 'dez'];
        $mesSelecionado = $campoMes[$mes];

        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', 'metas')
            ->where('ano', $ano)
            ->get()
            ->transform(function ($item) use ($mesSelecionado) {
                return [
                    'meta' => ($item[$mesSelecionado]),
                ];
            })[0]['meta'] ?? 0;
    }

    public function getMetasUsuario($id, $ano)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', 'metas')
            ->where('ano', $ano)
            ->first();
    }

    public function getMetasUsuarios($ano)
    {
        $dados = $this->newQuery()
            ->where('chave', 'metas')
            ->where('ano', $ano)
            ->get();

        $res = [];
        foreach ($dados as $dado) {
            $res[$dado->user_id] = $dado;
        }
        return $res;
    }
}
