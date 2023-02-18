<?php

namespace App\Services\Dev;

use App\Models\Dev;

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
        foreach ($dados as $dado) {
            $this->cards[$dado->status][] = [
                'id' => $dado->id,
                'titulo' => $dado->titulo,
                'descricao' => $dado->descricao,
                'prazo' => date('d/m/y', strtotime($dado->data_prazo))
            ];
        }
    }
}
