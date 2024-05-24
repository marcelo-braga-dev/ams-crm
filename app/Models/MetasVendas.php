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
        'mes',
        'valor',
    ];

    public function createOrUpdate($id, $dados)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['user_id' => $id, 'chave' => 'metas', 'ano' => $dados->ano, 'mes' => $dados->mes],
                ['valor' => convert_money_float($dados->valor)]
            );
    }

    public function getMetaEmpresa($mes, $ano)
    {
        return $this->newQuery()
            ->where('chave', 'metas_empresa')
            ->where('mes', $mes)
            ->where('ano', $ano)
            ->first('valor')->valor ?? 0;
    }

    public function updateMetaEmpresa($dados)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['user_id' => id_usuario_atual(), 'chave' => 'metas_empresa', 'ano' => $dados->ano, 'mes' => $dados->mes],
                ['valor' => convert_money_float($dados->valor)]
            );
    }

    /**
     * @deprecated
     */
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

    /**
     * @deprecated
     */
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
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', 'metas')
            ->where('mes', $mes)
            ->where('ano', $ano)
            ->first('valor')->valor ?? 0;
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

    public function metasMensais($id, $ano)
    {
        $query = $this->newQuery()
            ->where('chave', 'metas')
            ->where('user_id', $id)
            ->where('ano', $ano)
            ->get();

        $res = [];
        for ($i = 1; $i <= 12; $i++) {
            $res[$i] = $query->where('mes', $i)->first()->valor ?? 0;
        }
        return $res;
    }

    public function metasMensaisEmpresa($ano)
    {
        $query = $this->newQuery()
            ->where('chave', 'metas_empresa')
            ->where('ano', $ano)
            ->get();

        $res = [];
        for ($i = 1; $i <= 12; $i++) {
            $res[$i] = $query->where('mes', $i)->first()->valor ?? 0;
        }
        return $res;
    }
}
