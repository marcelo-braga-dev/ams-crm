<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dev extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'status',
        'titulo',
        'descricao',
        'anotacoes',
        'data_prazo_inicial',
        'area',
        'prioridade',
        'setor',
        'valor_inicial',
        'valor_final',
        'data_prazo_final',
        'sequencia',
        'status_pagamento'
    ];

    public function create($request)
    {
        $dados = $this->newQuery()
            ->create([
                'titulo' => $request->titulo,
                'descricao' => $request->descricao,
                'data_prazo_inicial' => $request->prazo,
                'status' => 'novo',
                'area' => $request->area,
                'prioridade' => $request->prioridade,
                'setor' => $request->setor,
                'valor_inicial' => convert_money_float($request->valor_servico)
            ]);
        return $dados->id;
    }

    public function get()
    {
        return $this->newQuery()
            ->orderBy('sequencia')
            ->get();
    }

    public function find($id)
    {
        $nomes = (new User())->getNomes();
        $dado = $this->newQuery()->find($id);
        $setor = (new Setores())->getNome();

        return [
            'id' => $dado->id,
            'nome' => $nomes[$dado->users_id] ?? '',
            'status' => $dado->status,
            'titulo' => $dado->titulo,
            'descricao' => $dado->descricao,
            'anotacoes' => $dado->anotacoes,
            'data_inicial' => date('d/m/Y', strtotime($dado->data_prazo_inicial)),
            'area' => $dado->area,
            'prioridade' => $dado->prioridade,
            'setor' => $setor[$dado->setor] ?? '-',
            'valor_inicial' => convert_float_money($dado->valor_inicial),
            'valor_final' => convert_float_money($dado->valor_final),
            'data_final' => date('d/m/Y', strtotime($dado->data_prazo_final)),
            'sequencia' => $dado->sequencia,
            'status_pagamento' => $dado->status_pagamento,
        ];
    }

    public function updateStatus($id, string $string)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status'=>$string
            ]);
    }
}
