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

    public function salarios($idUsuario, $ano)
    {
        $items = $this->newQuery()
            ->where('user_id', $idUsuario)
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

    public function atualizar($dados)
    {
        $filtro = ['user_id' => $dados->user_id, 'mes' => $dados->mes, 'ano' => $dados->ano];

        // Salario
        if ($dados->campo == 'salario' && $dados->valor) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['salario_fixo' => convert_money_float($dados->valor)]
            );

        if ($dados->campo == 'salario' && $dados->data) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['salario_fixo_pago' => $dados->data]
            );

        if ($dados->campo == 'salario' && isset($dados->status)) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['salario_fixo_status' => $dados->status]
            );

        // Premio
        if ($dados->campo == 'premio' && $dados->valor) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['premio' => convert_money_float($dados->valor)]
            );

        if ($dados->campo == 'premio' && $dados->data) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['premio_pago' => $dados->data]
            );

        if ($dados->campo == 'premio' && isset($dados->status)) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['premio_status' => $dados->status]
            );

        // Comissao
        if ($dados->campo == 'comissao' && $dados->valor) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['comissao' => convert_money_float($dados->valor)]
            );

        if ($dados->campo == 'comissao' && $dados->data) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['comissao_pago' => $dados->data]
            );

        if ($dados->campo == 'comissao' && isset($dados->status)) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['comissao_status' => $dados->status]
            );

        // Bonus
        if ($dados->campo == 'bonus' && $dados->valor) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['bonus' => convert_money_float($dados->valor)]
            );

        if ($dados->campo == 'bonus' && $dados->data) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['bonus_pago' => $dados->data]
            );

        if ($dados->campo == 'bonus' && isset($dados->status)) $this->newQuery()
            ->updateOrCreate(
                $filtro,
                ['bonus_status' => $dados->status]
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
            $res[$item->salario_fixo_pago][] = ['tipo' => 'Salário', 'id' => $item->id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->salario_fixo_pago), 'valor' => $item->salario_fixo, 'status' => $item->salario_fixo_status];
            $total += $item->salario_fixo;
        }
        foreach ($items->where('premio_pago', '!=', null)
                     ->where('premio_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('premio_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $res[$item->premio_pago][] = ['tipo' => 'Prêmio', 'id' => $item->id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->premio_pago), 'valor' => $item->premio, 'status' => $item->premio_status];
            $total += $item->premio;
        }
        foreach ($items->where('comissao_pago', '!=', null)
                     ->where('comissao_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('comissao_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $res[$item->comissao_pago][] = ['tipo' => 'Comissão', 'id' => $item->id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->comissao_pago), 'valor' => $item->comissao, 'status' => $item->comissao_status];
            $total += $item->comissao;
        }
        foreach ($items->where('bonus_pago', '!=', null)
                     ->where('bonus_pago', '>=', date('Y-m-d', strtotime($dataInicio)))
                     ->where('bonus_pago', '<=', date('Y-m-d', strtotime($dataFim))) as $item) {
            $res[$item->bonus_pago][] = ['tipo' => 'Bônus', 'id' => $item->id, 'nome' => $nomes[$item->user_id], 'data' => converterData($item->bonus_pago), 'valor' => $item->bonus, 'status' => $item->bonus_status];
            $total += $item->bonus;
        }

        return ['registros' => $res, 'total' => $total];
    }
}
