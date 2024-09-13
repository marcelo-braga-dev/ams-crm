<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FluxoCaixa extends Model
{
    use HasFactory;

//    protected $table = 'fluxo_caixas_antigo';

    protected $fillable = [
        'user_id',
        'banco_id',
        'fornecedor_id',
        'empresa_id',
        'franquia_id',
        'status',
        'data',
        'data_pagamento',
        'tipo',
        'nota_fiscal',
        'valor',
//        'previsao_recebimento',
//        'data_vencimento',
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
                    'data_pagamento' => $item['data_pagamento'] ?? null,
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

    public function getValores($incio = null, $fim = null, $tipo = null, $status = null, $fornecedor = null, $franquia = null, $empresa = null)
    {
        $franquias = (new Franquias())->getNomes();
        $nomes = (new FluxoCaixasConfig())->getNomes();

        $query = $this->newQuery();

        if ($incio) $query->whereDate('data_pagamento', '>=', date('Y-m-d', strtotime($incio)))
            ->whereDate('data_pagamento', '<=', date('Y-m-d', strtotime($fim)));

        if ($tipo) $query->where('tipo', $tipo);
        if ($status) $query->where('status', $status);
        if ($fornecedor) $query->where('fornecedor_id', $fornecedor);
        if ($franquia) $query->where('franquia_id', $franquia);
        if ($empresa) $query->where('empresa_id', $empresa);

        $in = [is_fluxocaixa_entradas() ? 'entrada' : '', is_fluxocaixa_saidas() ? 'saida' : ''];

        $items = ($query->orderByDesc('data_pagamento')
//            ->whereIn('tipo',['entrada'])
            ->whereIn('tipo', $in)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $franquias) {
                return $this->dados($item, $nomes, $franquias);
            }));

        $res = [];
        foreach ($items as $item) {
            $res[intval($item['dia'])][] = $item;
        }
        return $res;
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
            ->get(['id', 'valor', 'data_pagamento', 'valor_baixa', 'data_baixa'])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'valor' => convert_float_money($item->valor),
                    'data_vencimento' => $item->data_pagamento,
                    'valor_baixa' => $item->valor_baixa ? convert_float_money($item->valor_baixa) : '',
                    'data_baixa' => $item->data_baixa ?? '',
                    'previsao_recebimento' => $item->data_pagamento ?? ''
                ];
            }) : [];

        return [
            'id' => $item->id,
            'data' => date('d/m/Y', strtotime($item->data_pagamento)),
            'dia' => date('d', strtotime($item->data_pagamento)),
            '_data' => $item->data,
            'tipo' => $item->tipo,
            'fornecedor' => $nomes[$item->fornecedor_id] ?? '',
            'fornecedor_id' => $item->fornecedor_id,
            'empresa' => $nomes[$item->empresa_id] ?? '',
            '_empresa' => $item->empresa_id,
            'franquia' => $franquias[$item['franquia_id']] ?? '',
            'franquia_id' => $item['franquia_id'] ?? '',
            'nota_fiscal' => $item->nota_fiscal,
            'valor' => convert_float_money($item->valor),
            'valor_float' => $item->valor,
            'data_vencimento' => $item->data_vencimento ? date('d/m/Y', strtotime($item->data_vencimento)) : '',
            'valor_baixa' => $item->valor_baixa ? convert_float_money($item->valor_baixa) : '',
            'data_baixa' => $item->data_baixa ? date('d/m/Y', strtotime($item->data_baixa)) : '',
            'data_baixa_float' => $item->data_baixa ?? '',
            'previsao_recebimento' => $item->data_pagamento ? date('d/m/Y', strtotime($item->data_pagamento)) : '',
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

        foreach ($dados['campos_pagamentos'] as $n => $item) {//print_pre($dados->all());
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
                        'data_pagamento' => $item['data_pagamento'] ?? null,
                        'banco_id' => $dados->banco,
                        'status' => $dados->status,
                        'nota_fiscal' => $dados->nota_fiscal,
                        'data_vencimento' => $item['data_vencimento'] ?? $item['data_vencimento'] ?? null,
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

    public function entradas($mes, $ano)
    {
        $items = $this->newQuery()
            ->whereMonth('data_pagamento', $mes)
            ->whereYear('data_pagamento', $ano)
            ->select(DB::raw('
                SUM(CASE WHEN tipo = "entrada" THEN valor ELSE 0 END) AS entrada,
                SUM(CASE WHEN tipo = "entrada" AND status = "pago" THEN valor ELSE 0 END) AS entrada_pago,
                SUM(CASE WHEN tipo = "entrada" AND status = "aberto" THEN valor ELSE 0 END) AS entrada_aberto,

                SUM(CASE WHEN tipo = "saida" THEN valor ELSE 0 END) AS saida,
                SUM(CASE WHEN tipo = "saida" AND status = "pago" THEN valor ELSE 0 END) AS saida_pago,
                SUM(CASE WHEN tipo = "saida" AND status = "aberto" THEN valor ELSE 0 END) AS saida_aberto,

                SUM(valor) as total,
                DAY(data_pagamento) as dia
            '))
            ->orderBy('data_pagamento')
            ->groupBy('data_pagamento')
            ->get();

        $fluxo = [];
        foreach ($items as $item) {
            $fluxo[$item->dia] = $item;
        }

        $totais = $this->newQuery()
            ->whereMonth('data_pagamento', $mes)
            ->whereYear('data_pagamento', $ano)
            ->select(DB::raw('
                SUM(CASE WHEN tipo = "entrada" THEN valor ELSE 0 END) AS entrada,
                SUM(CASE WHEN tipo = "entrada" AND status = "pago" THEN valor ELSE 0 END) AS entrada_pago,
                SUM(CASE WHEN tipo = "entrada" AND status = "aberto" THEN valor ELSE 0 END) AS entrada_aberto,

                SUM(CASE WHEN tipo = "saida" THEN valor ELSE 0 END) AS saida,
                SUM(CASE WHEN tipo = "saida" AND status = "pago" THEN valor ELSE 0 END) AS saida_pago,
                SUM(CASE WHEN tipo = "saida" AND status = "aberto" THEN valor ELSE 0 END) AS saida_aberto,

                SUM(valor) as total,
                DAY(data_pagamento) as dia
            '))
            ->first();

        $ultimoDia = date('t', strtotime($ano . '-' . $mes . '-' . '1'));

        return ['movimentacao' => $fluxo, 'totais' => $totais, 'ultimoDia' => $ultimoDia];
    }

    private function token($token): Builder
    {
        return $this->newQuery()->where('token', $token);
    }
}
