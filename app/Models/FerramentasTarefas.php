<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FerramentasTarefas extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'setor_id',
        'status',
        'area',
        'prioridade',
        'titulo',
        'descricao',
        'anotacoes',
        'sequencia',
        'data_prazo_inicial',
        'data_prazo_final',
        'valor_inicial',
        'valor_final',
        'status_pagamento',
    ];

    public function getStatus()
    {
        return $this->newQuery()
            ->get()
            ->groupBy('status')
            ->map(function ($items) {
                return $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'titulo' => $item->titulo,
                        'descricao' => $item->descricao,
                        'area' => $item->area,
                        'setor' => $setor[$item->setor] ?? '-',
                        'prioridade' => $item->prioridade,
                        'sequencia' => $item->sequencia,
                        'valor_inicial' => convert_float_money($item->valor_inicial),
                        'valor_final' => convert_float_money($item->valor_final),
                        'prazo_inicial' => date('d/m/y', strtotime($item->data_prazo_inicial)),
                        'prazo_final' => $item->data_prazo_final ? date('d/m/y', strtotime($item->data_prazo_final)) : null,
                        'status_pagamento' => $item->status_pagamento
                    ];
                });
            });
    }

    public function create($dados)
    {
        $item = $this->newQuery()
            ->create([
                'status' => 'aberto',
                'data_prazo_inicial' => $dados->prazo,
                'descricao' => $dados->descricao,
                'titulo' => $dados->titulo,
                'area' => $dados->area,
                'setor_id' => $dados->setor,
                'prioridade' => $dados->prioridade,
            ]);

        (new FerramentasTarefasItens())->create($item->id, $dados->tarefas);
    }

    public function find($id)
    {
        $dado = $this->newQuery()
            ->find($id);

        return [
            'id' => $dado->id,
            'nome' => $nomes[$dado->user_id] ?? '',
            'status' => $dado->status,
            'titulo' => $dado->titulo,
            'descricao' => $dado->descricao,
            'anotacoes' => $dado->anotacoes,
            'data_inicial' => date('d/m/Y', strtotime($dado->data_prazo_inicial)),
            'area' => $dado->area,
            'prioridade' => $dado->prioridade,
            'setor' => $setor[$dado->setor_id] ?? '-',
            'valor_inicial' => convert_float_money($dado->valor_inicial),
            'valor_final' => convert_float_money($dado->valor_final),
            'data_final' => date('d/m/Y', strtotime($dado->data_prazo_final)),
            'sequencia' => $dado->sequencia,
            'status_pagamento' => $dado->status_pagamento,
        ];
    }

    public function avancarStatus(int $id, string $status)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => $status]);
    }
}
