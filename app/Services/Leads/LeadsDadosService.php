<?php

namespace App\Services\Leads;

use App\Models\Leads;
use App\Models\User;

class LeadsDadosService
{
    private array $consultores;

    public function __construct()
    {
        $this->consultores = (new User())->getNomeConsultores();
    }

    public function getDisponiveis()
    {
        $dados = (new Leads())->getDisponiveis();

        return $this->dados($dados);
    }

    public function getAll()
    {
        $dados = (new Leads())->getAll();

        return $this->dados($dados);
    }

    public function getConsultor()
    {
        $dados = (new Leads())->getConsultores();

        return $this->dados($dados);
    }

    public function lead($id)
    {
        $dados = (new Leads())->find($id);

        return $this->items($dados);
    }

    private function dados($items)
    {
        $dados = [];

        foreach ($items as $item) {
            $dados[] = $this->items($item);
        }
        return $dados;
    }

    private function items($item)
    {

        return [
            'id' => $item->id,

            'consultor' => [
                'nome' => $this->consultores[$item->users_id] ?? ''
            ],

            'cliente' => [
                'nome' => $item->nome,
                'razao_social' => $item->razao_social,
                'cidade' => $item->cidade,
                'estado' => $item->estado,
                'pessoa' => $item->pessoa_fisica ? 'PF' : 'PJ',
            ],

            'contato' => [
                'email' => $item->email,
                'telefone' => $item->telefone,
                'atendente' => $item->atendente,
            ],

            'infos' => [
                'status' => $item->status,
                'status_anotacoes' => $item->status_anotacoes,
                'anotacoes' => $item->infos,
                'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                'contato' => $item->meio_contato,
                'data_criacao' => date('d/m/y H:i', strtotime($item->updated_at)),
            ],
        ];
    }

    public function getOcultos()
    {
        $dados = (new Leads())->getOcultos();

        return $this->dados($dados);
    }
}
