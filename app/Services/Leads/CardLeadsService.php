<?php

namespace App\Services\Leads;

use App\Models\Leads;
use App\Models\User;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\CanceladoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;

class CardLeadsService
{
    private array $cards;
    private $colsultores;

    public function __construct()
    {
        $this->colsultores = (new User())->getNomeConsultores();
    }

    public function getConsultor(int $id)
    {
        $dados = (new Leads())->getConsultores($id);
        $this->cards($dados);

        return $this->cards;
    }

    private function cards($dados): void
    {
        $this->setCards();

        $novo = (new NovoStatusLeads())->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();
        $cancelado = (new CanceladoStatusLeads())->getStatus();

        foreach ($dados as $item) {

            switch ($item->status) {
                case $novo :
                    $this->cards['novo'][] = $this->dados($item);
                    break;
                case $atendimento :
                    $this->cards['atendimento'][] = $this->dados($item);
                    break;
                case $finalizado :
                    $this->cards['finalizado'][] = $this->dados($item);
                    break;
                case $cancelado :
                    $this->cards['cancelado'][] = $this->dados($item);
                    break;
            }
        }
    }

    private function dados($item): array
    {
        return [
            'id' => $item->id,

            'consultor' => [
                'nome' => $this->colsultores[$item->users_id] ?? '-'
            ],

            'cliente' => [
                'nome' => $item->nome,
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

    private function setCards(): void
    {
        $this->cards = [];
        $this->cards['novo'] = [];
        $this->cards['atendimento'] = [];
        $this->cards['finalizado'] = [];
        $this->cards['cancelado'] = [];
    }
}
