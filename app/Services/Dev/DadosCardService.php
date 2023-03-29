<?php

namespace App\Services\Dev;

use App\Models\Dev;
use App\Models\Setores;

class DadosCardService
{
    private array $cards;

    public function __construct()
    {
        $this->cards = [
            'novo' => [],
            'andamento' => [],
            'aprovando' => [],
            'finalizado' => [],
        ];
    }

    public function get()
    {
        $dados = (new Dev())->get();
        $this->dados($dados);

        return $this->cards;
    }

    private function dados($dados)
    {
        $setor = (new Setores())->getNome();

        foreach ($dados as $dado) {
            $this->cards[$dado->status][] = [
                'id' => $dado->id,
                'titulo' => $dado->titulo,
                'descricao' => $dado->descricao,
                'area' => $dado->area,
                'setor' => $setor[$dado->setor] ?? '-',
                'prioridade' => $dado->prioridade,
                'sequencia' => $dado->sequencia,
                'valor_inicial' => convert_float_money($dado->valor_inicial),
                'valor_final' => convert_float_money($dado->valor_final),
                'prazo_inicial' => date('d/m/y', strtotime($dado->data_prazo_inicial)),
                'prazo_final' => $dado->data_prazo_final ? date('d/m/y', strtotime($dado->data_prazo_final)) : null,
                'status_pagamento' => $dado->status_pagamento
            ];
        }
    }
}
