<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceirosSalarios extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ano',
        'mes',
        'competencia',
        'salario_fixo',
        'salario_fixo_pago',
        'salario_fixo_status',
        'premio',
        'premio_pago',
        'premio_status',
        'comissao',
        'comissao_pago',
        'comissao_status',
        'bonus',
        'bonus_pago',
        'bonus_status',
    ];

    public function salarios($idUsuario, $mes, $ano)
    {
        $items = $this->newQuery()
            ->where('user_id', $idUsuario)
//            ->where('mes', $mes)
            ->where('ano', $ano)
            ->orderBy('mes')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'mes' => $item->mes,
                    'salario_fixo' => convert_float_money($item['salario_fixo'] ?? 0),
                    'salario_fixo_data' => $item['salario_fixo_pago'] ?? '',
                    'salario_fixo_status' => $item['salario_fixo_status'] ?? '',

                    'premio' => convert_float_money($item['premio'] ?? 0),
                    'premio_data' => ($item['premio_pago'] ?? null) ? date('Y-m-d', strtotime($item['premio_pago'] ?? '')) : '',
                    'premio_status' => $item['premio_status'] ?? '',

                    'comissao' => convert_float_money($item['comissao'] ?? 0),
                    'comissao_data' => $item['comissao_pago'] ?? '',
                    'comissao_status' => $item['comissao_status'] ?? '',

                    'bonus' => convert_float_money($item['bonus'] ?? 0),
                    'bonus_data' => $item['bonus_pago'] ?? '',
                    'bonus_status' => $item['bonus_status'] ?? '',

                    'total' => convert_float_money(
                        ($item['salario_fixo'] ?? 0) +
                        ($item['premio'] ?? 0) +
                        ($item['comissao'] ?? 0) +
                        ($item['bonus'] ?? 0)
                    )
                ];
            });

        $res = [];
        foreach ($items as $item) {
            $res[$item['mes']] = $item;
        }
        return $res;
    }

    public function salariosMes($idUsuario, $mes, $ano)
    {
        return $this->newQuery()
            ->where('user_id', $idUsuario)
            ->where('mes', $mes)
            ->where('ano', $ano)
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'mes' => $item->mes,
                    'salario_fixo' => convert_float_money($item['salario_fixo'] ?? 0),
                    'salario_fixo_data' => $item['salario_fixo_pago'] ?? '',
                    'salario_fixo_status' => $item['salario_fixo_status'] ?? '',

                    'premio' => convert_float_money($item['premio'] ?? 0),
                    'premio_data' => ($item['premio_pago'] ?? null) ? date('Y-m-d', strtotime($item['premio_pago'] ?? '')) : '',
                    'premio_status' => $item['premio_status'] ?? '',

                    'comissao' => convert_float_money($item['comissao'] ?? 0),
                    'comissao_data' => $item['comissao_pago'] ?? '',
                    'comissao_status' => $item['comissao_status'] ?? '',

                    'bonus' => convert_float_money($item['bonus'] ?? 0),
                    'bonus_data' => $item['bonus_pago'] ?? '',
                    'bonus_status' => $item['bonus_status'] ?? '',

                    'total' => convert_float_money(
                        ($item['salario_fixo'] ?? 0) +
                        ($item['premio'] ?? 0) +
                        ($item['comissao'] ?? 0) +
                        ($item['bonus'] ?? 0)
                    )
                ];
            })[0] ?? [];
    }

    public function atualizar($dados)
    {
        $filtro = ['user_id' => $dados->user_id, 'mes' => $dados->mes, 'ano' => $dados->ano, 'competencia' => $dados->competencia];

        // Salario
        if ($dados->campo == 'salario' && isset($dados['salario']['valor'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['salario_fixo' => convert_money_float($dados['salario']['valor'])]
            );

        if ($dados->campo == 'salario' && isset($dados['salario']['data'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['salario_fixo_pago' => $dados['salario']['data']]
            );

        if ($dados->campo == 'salario' && isset($dados['salario']['status'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['salario_fixo_status' => $dados['salario']['status']]
            );

        // Premio
        if ($dados->campo == 'premio' && isset($dados['premio']['valor'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['premio' => convert_money_float($dados['premio']['valor'])]
            );

        if ($dados->campo == 'premio' && isset($dados['premio']['data'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['premio_pago' => $dados['premio']['data']]
            );

        if ($dados->campo == 'premio' && isset($dados['premio']['status'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['premio_status' => $dados['premio']['status']]
            );

        // Comissao
        if ($dados->campo == 'comissao' && isset($dados['comissao']['valor'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['comissao' => convert_money_float($dados['comissao']['valor'])]
            );

        if ($dados->campo == 'comissao' && isset($dados['comissao']['data'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['comissao_pago' => $dados['comissao']['data']]
            );

        if ($dados->campo == 'comissao' && isset($dados['comissao']['status'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['comissao_status' => $dados['comissao']['status']]
            );

        // Bonus
        if ($dados->campo == 'bonus' && isset($dados['bonus']['valor'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['bonus' => convert_money_float($dados['bonus']['valor'])]
            );

        if ($dados->campo == 'bonus' && isset($dados['bonus']['data'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['bonus_pago' => $dados['bonus']['data']]
            );

        if ($dados->campo == 'bonus' && isset($dados['bonus']['status'])) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['bonus_status' => $dados['bonus']['status']]
            );
    }

    public function financeiro($dataInicio, $dataFim)
    {
        $nomes = (new User())->getNomes();

        $query = $this->newQuery();
        $items = $query->get();


        $total = 0;
        $res = [];
        function converterData($data = null)
        {
            return date('d/m/Y', strtotime($data));
        }

        foreach ($items->where('salario_fixo_pago', '!=', null)
                     ->where('salario_fixo_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('salario_fixo_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $dia = intval(date('d', strtotime($item->salario_fixo_pago)));
            $res[$dia][] = ['tipo' => 'Salário', 'id' => $item->id, 'user_id' => $item->user_id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->salario_fixo_pago), 'mes' => $item->mes, 'valor' => $item->salario_fixo, 'status' => $item->salario_fixo_status];
            $total += $item->salario_fixo;
        }
        foreach ($items->where('premio_pago', '!=', null)
                     ->where('premio_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('premio_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $dia = intval(date('d', strtotime($item->premio_pago)));
            $res[$dia][] = ['tipo' => 'Prêmio', 'id' => $item->id, 'user_id' => $item->user_id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->premio_pago), 'mes' => $item->mes, 'valor' => $item->premio, 'status' => $item->premio_status];
            $total += $item->premio;
        }
        foreach ($items->where('comissao_pago', '!=', null)
                     ->where('comissao_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('comissao_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $dia = intval(date('d', strtotime($item->comissao_pago)));
            $res[$dia][] = ['tipo' => 'Comissão', 'id' => $item->id, 'user_id' => $item->user_id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->comissao_pago), 'mes' => $item->mes, 'valor' => $item->comissao, 'status' => $item->comissao_status];
            $total += $item->comissao;
        }
        foreach ($items->where('bonus_pago', '!=', null)
                     ->where('bonus_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('bonus_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $dia = intval(date('d', strtotime($item->bonus_pago)));
            $res[$dia][] = ['tipo' => 'Bônus', 'id' => $item->id, 'user_id' => $item->user_id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->bonus_pago), 'mes' => $item->mes, 'valor' => $item->bonus, 'status' => $item->bonus_status];
            $total += $item->bonus;
        }

        return ['registros' => $res, 'total' => $total];
    }
}
