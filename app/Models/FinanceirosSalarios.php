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

    public function salarios($mes, $ano)
    {
        $salarios = $this->newQuery()
            ->where('mes', $mes)
//            ->where('ano', $ano)
            ->get();

        $valores = [];
        foreach ($salarios as $salario) {
            $valores[$salario->user_id] = $salario;
        }

        $usuarios = (new User())->getConsultores();

        $res = [];
        foreach ($usuarios as $item) {
            $res[] = [
                ...$item,
                'salario_fixo' => convert_float_money($valores[$item['id']]['salario_fixo'] ?? 0),
                'salario_fixo_data' => $valores[$item['id']]['salario_fixo_pago'] ?? '',
                'salario_fixo_status' => $valores[$item['id']]['salario_fixo_status'] ?? '',

                'premio' => convert_float_money($valores[$item['id']]['premio'] ?? 0),
                'premio_data' => ($valores[$item['id']]['premio_pago'] ?? null) ? date('Y-m-d', strtotime($valores[$item['id']]['premio_pago'] ?? '')) : '',
                'premio_status' => $valores[$item['id']]['premio_status'] ?? '',

                'comissao' => convert_float_money($valores[$item['id']]['comissao'] ?? 0),
                'comissao_data' => $valores[$item['id']]['comissao_pago'] ?? '',
                'comissao_status' => $valores[$item['id']]['comissao_status'] ?? '',

                'bonus' => convert_float_money($valores[$item['id']]['bonus'] ?? 0),
                'bonus_data' => $valores[$item['id']]['bonus_pago'] ?? '',
                'bonus_status' => $valores[$item['id']]['bonus_status'] ?? '',

                'total' => convert_float_money(
                    ($valores[$item['id']]['salario_fixo'] ?? 0) +
                    ($valores[$item['id']]['premio'] ?? 0) +
                    ($valores[$item['id']]['comissao'] ?? 0) +
                    ($valores[$item['id']]['bonus'] ?? 0)
                )
            ];
        }

        return $res;
    }

    public function atualizar($dados)
    {
        $filtro = ['user_id' => $dados->id, 'mes' => $dados->mes, 'ano' => $dados->ano];

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
}
