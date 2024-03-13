<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FluxoCaixa extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'banco_id',
        'fornecedor_id',
        'empresa_id',
        'franquia_id',
        'status',
        'data',
        'tipo',
        'nota_fiscal',
        'valor',
        'previsao_recebimento',
        'data_vencimento',
        'valor_baixa',
        'data_baixa',
        'descricao',
        'n_pagamento',
        'total_pagamentos',
        'token',
    ];

    public function create($dados)
    {
        $token = uniqid();
        foreach ($dados['campos_pagamentos'] as $i => $item) {
            $this->newQuery()
                ->create([
                    'user_id' => id_usuario_atual(),
                    'tipo' => $dados->tipo,
                    'data' => $dados->data,
                    'empresa_id' => $dados->empresa,
                    'fornecedor_id' => $dados->fornecedores,
                    'franquia_id' => $dados->franquia ?? franquia_usuario_atual(),
                    'valor' => convert_money_float($item['valor']),
                    'previsao_recebimento' => $item['previsao_recebimento'] ?? null,
                    'banco_id' => $dados->banco,
                    'status' => $dados->status,
                    'nota_fiscal' => $dados->nota_fiscal,
                    'data_vencimento' => $item['data_vencimento'] ?? null,
                    'valor_baixa' => $dados->valor_baixa,
                    'data_baixa' => $dados->data_baixa,
                    'descricao' => $dados->descricao,
                    'n_pagamento' => $i + 1,
                    'total_pagamentos' => count($dados['campos_pagamentos']),
                    'token' => $token
                ]);
        }


    }

    public function getValores($incio = null, $fim = null, $tipo = null, $status = null, $fornecedor = null, $franquia = null)
    {
        $franquias = (new Franquias())->getNomes();
        $nomes = (new FluxoCaixasConfig())->getNomes();

        $query = $this->newQuery();

        if ($incio) $query->whereDate('data', '>=', date('Y-m-d', strtotime($incio)))
            ->whereDate('data', '<=', date('Y-m-d', strtotime($fim)));

        if ($tipo) $query->where('tipo', $tipo);
        if ($status) $query->where('status', $status);
        if ($fornecedor) $query->where('fornecedor_id', $fornecedor);
        if ($franquia) $query->where('franquia_id', $franquia);

        return $query->orderByDesc('data_vencimento')
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $franquias) {
                return $this->dados($item, $nomes, $franquias);
            });
    }

    public function find($id)
    {
        $franquias = (new Franquias())->getNomes();

        $item = $this->newQuery()->find($id);
        $nomes = (new FluxoCaixasConfig())->getNomes();

        return $this->dados($item, $nomes, $franquias);
    }

    private function dados($item, $nomes, $franquias)
    {
        $parcelas = $item->token ? $this->newQuery()
            ->where('token', $item->token)
            ->get(['id', 'valor', 'data_vencimento', 'valor_baixa', 'data_baixa', 'previsao_recebimento'])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => convert_float_money($item->valor),
                    'data_vencimento' => $item->data_vencimento,
                    'valor_baixa' => $item->valor_baixa ? convert_float_money($item->valor_baixa) : '',
                    'data_baixa' => $item->data_baixa ?? '',
                    'previsao_recebimento' => $item->previsao_recebimento ?? ''
                ];
            }) : [];

        return [
            'id' => $item->id,
            'data' => date('d/m/Y', strtotime($item->data)),
            '_data' => $item->data,
            'tipo' => $item->tipo,
            'fornecedor' => $nomes[$item->fornecedor_id] ?? '',
            'fornecedor_id' => $item->fornecedor_id,
            'empresa' => $nomes[$item->empresa_id] ?? '',
            '_empresa' => $item->empresa_id,
            'franquia' => $franquias[$item['franquia_id']] ?? '',
            'nota_fiscal' => $item->nota_fiscal,
            'valor' => convert_float_money($item->valor),
            'valor_float' => $item->valor,
            'data_vencimento' => $item->data_vencimento ? date('d/m/Y', strtotime($item->data_vencimento)) : '',
            'valor_baixa' => $item->valor_baixa ? convert_float_money($item->valor_baixa) : '',
            'data_baixa' => $item->data_baixa ? date('d/m/Y', strtotime($item->data_baixa)) : '',
            'data_baixa_float' => $item->data_baixa ?? '',
            'previsao_recebimento' => $item->previsao_recebimento ? date('d/m/Y', strtotime($item->previsao_recebimento)) : '',
            'banco_id' => $item->banco_id,
            'banco' => $nomes[$item->banco_id] ?? '',
            'status' => $item->status,
            'descricao' => $item->descricao,
            'qtd_parcelas' => ($item->n_pagamento ?? 1) . '/' . (count($parcelas)),
            'n_pagamento' => ($item->n_pagamento ?? 1),
            'total_pagamentos' => (count($parcelas)),//($item->total_pagamentos ?? 1),
            'atrasado' => $item->status == 'aberto' && (strtotime($item->data_vencimento) > strtotime(now())) && $item->tipo == 'entrada',
            'parcelas' => $parcelas
        ];
    }

    public function atualizarBaixa($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'valor_baixa' => convert_money_float($dados->valor_baixa),
                'data_baixa' => $dados->data_baixa,
                'banco_id' => $dados->banco,
            ]);
    }

    public function updateStatus($id, $status)
    {

        $query = $this->newQuery()
            ->find($id);

        $status = $query->status == 'pago' ? 'aberto' : 'pago';

        $query->update([
            'status' => $status
        ]);
    }

    public function atualizar($id, $dados)
    {
        $atual = $this->newQuery()->find($id);

        foreach ($dados['campos_pagamentos'] as $n => $item) {
            $this->newQuery()
                ->updateOrCreate(
                    ['id' => $item['id'] ?? null],
                    [
                        'user_id' => id_usuario_atual(),
                        'tipo' => $dados->tipo,
                        'data' => $dados->data,
                        'empresa_id' => $dados->empresa,
                        'fornecedor_id' => $dados->fornecedores,
                        'franquia_id' => $dados->franquia ?? franquia_usuario_atual(),
                        'valor' => convert_money_float($item['valor'] ?? 0),
                        'previsao_recebimento' => $item['previsao_recebimento'] ?? null,
                        'banco_id' => $dados->banco,
                        'status' => $dados->status,
                        'nota_fiscal' => $dados->nota_fiscal,
                        'data_vencimento' => $item['data_vencimento'] ?? null,
                        'valor_baixa' => convert_money_float($item['valor_baixa'] ?? 0),
                        'data_baixa' => $item['data_baixa'] ?? null,
                        'descricao' => $dados->descricao,
                        'n_pagamento' => $n + 1,
                        'total_pagamentos' => count($dados['campos_pagamentos']),
                        'token' => $atual->token
                    ]
                );
        }
    }

    public function excluir($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
    }

    private function token($token): Builder
    {
        return $this->newQuery()->where('token', $token);
    }
}
