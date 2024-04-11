<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FinanceirosSalarios extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ano',
        'mes',
        'competencia',

        'chave',
        'valor',
        'margem',
        'data_pagamento',
        'status',
    ];

    public function salariosMes($idUsuario, $mes, $ano)
    {
        $salario = $this->newQuery()
            ->where('user_id', $idUsuario)
            ->where('mes', $mes)
            ->where('ano', $ano)
            ->get();

        $res = [];
        $res['total'] = 0;
        foreach ($salario as $sal) {
            $res[$sal->chave] = $sal;
            $res['total'] += $sal->valor;
        }

        return $res;
    }

    public function atualizar($dados)
    {
        $query = $this->newQuery();

        $filtro = ['chave' => $dados->campo, 'user_id' => $dados->user_id, 'mes' => $dados->mes, 'ano' => $dados->ano, 'competencia' => $dados->competencia];

        if (isset($dados[$dados->campo]['valor']))
            $query->updateOrCreate(
                $filtro,
                ['valor' => convert_money_float($dados[$dados->campo]['valor'])]
            );

        if (isset($dados[$dados->campo]['data']))
            $query->updateOrCreate(
                $filtro,
                ['data_pagamento' => $dados[$dados->campo]['data']]
            );

        if (isset($dados[$dados->campo]['status']))
            $query->updateOrCreate(
                $filtro,
                ['status' => $dados[$dados->campo]['status']]
            );

        if (isset($dados[$dados->campo]['margem']))
            $query->updateOrCreate(
                $filtro,
                ['margem' => convert_money_float($dados[$dados->campo]['margem'], 3)]
            );
    }

    public function financeiro($dataInicio, $dataFim)
    {
        $nomes = (new User())->getNomes();
        $tipos = ['salario_fixo' => 'Salário Fixo', 'premio' => 'Prêmio', 'premio_extra' => 'Prêmio Extra', 'bonus' => 'Bônus'];

        $dados = $this->newQuery()
            ->where('data_pagamento', '>=', date('Y-m-d', strtotime($dataInicio)))
            ->where('data_pagamento', '<=', date('Y-m-d', strtotime($dataFim)))
            ->get();

        $res = [];
        $total = 0;
        foreach ($dados as $item) {
            $dia = intval(date('d', strtotime($item->data_pagamento)));
            $res[$dia][] = ['tipo' => $tipos[$item->chave] ?? '', 'id' => $item->id, 'user_id' => $item->user_id, 'nome' => $nomes[$item->user_id], 'data' => date('d/m/Y', strtotime($item->data_pagamento)), 'mes' => $item->mes, 'valor' => $item->valor, 'status' => $item->status];;
            $total += $item->valor;
        }

        return ['registros' => $res, 'total' => $total];
    }

    public function financeiroMes($mes, $ano)
    {
        $dados = $this->newQuery()
            ->whereMonth('data_pagamento', $mes)
            ->whereYear('data_pagamento', $ano)
            ->select(DB::raw('
                SUM(CASE WHEN status = "0" THEN valor ELSE 0 END) AS aberto,
                SUM(CASE WHEN status = "1" THEN valor ELSE 0 END) AS pago,
                SUM(valor) AS total,
                DAY(data_pagamento) as dia
            '))
            ->groupBy('data_pagamento')
            ->get();

        $res = [];
        $total = 0;
        $aberto = 0;
        $pago = 0;
        foreach ($dados as $item) {
            $res[$item->dia] = $item;
            $total += $item->total;
            $aberto += $item->aberto;
            $pago += $item->pago;
        }
        return ['registros' => $res, 'total' => $total, 'aberto' => $aberto, 'pago' => $pago];
    }
}
