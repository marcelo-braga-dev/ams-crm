<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FluxoCaixa extends Model
{
    protected $fillable = [
        'user_id',
        'banco_id',
        'fornecedor_id',
        'empresa_id',
        'status',
        'data',
        'tipo',
        'nota_fiscal',
        'valor',
        'previsao_recebimento',
        'data_vencimento',
        'valor_baixa',
        'data_baixa',
        'descricao'
    ];

    use HasFactory;

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'tipo' => $dados->tipo,
                'data' => $dados->data,
                'empresa_id' => $dados->empresa,
                'fornecedor_id' => $dados->fornecedores,
                'valor' => convert_money_float($dados->valor),
                'previsao_recebimento' => $dados->previsao_recebimento,
                'banco_id' => $dados->banco,
                'status' => $dados->status,
                'nota_fiscal' => $dados->nota_fiscal,
                'data_vencimento' => $dados->data_vencimento,
                'valor_baixa' => $dados->valor_baixa,
                'data_baixa' => $dados->data_baixa,
                'descricao' => $dados->descricao
            ]);
    }

    public function getValores()
    {
        $nomes = (new FluxoCaixasConfig())->getNomes();

        return $this->newQuery()
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes) {
                return $this->dados($item, $nomes);
            });
    }

    public function find($id)
    {
        $item = $this->newQuery()->find($id);
        $nomes = (new FluxoCaixasConfig())->getNomes();

        return $this->dados($item, $nomes);
    }

    private function dados($item, $nomes)
    {
        return [
            'id' => $item->id,
            'data' => date('d/m/Y', strtotime($item->data)),
            'tipo' => $item->tipo,
            'fornecedor' => $nomes[$item->fornecedor_id] ?? '',
            'empresa' => $nomes[$item->empresa_id] ?? '',
            'nota_fiscal' => $item->nota_fiscal,
            'valor' => convert_float_money($item->valor),
            'data_vencimento' => $item->data_vencimento ? date('d/m/Y', strtotime($item->data_vencimento)) : '',
            'valor_baixa' => $item->valor_baixa ? convert_float_money($item->valor_baixa) : '',
            'data_baixa' => $item->data_baixa ? date('d/m/Y', strtotime($item->data_baixa)) : '',
            'banco' => $nomes[$item->banco_id] ?? '',
            'status' => $item->status,
            'descricao' => $item->descricao,
            'atrasado' => $item->status == 'aberto' && (strtotime($item->data_vencimento) > strtotime(now())) && $item->tipo == 'entrada'
        ];
    }

    public function atualizarBaixa($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'valor_baixa' => convert_money_float($dados->valor_baixa),
                'data_baixa' => $dados->data_baixa,
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
}
