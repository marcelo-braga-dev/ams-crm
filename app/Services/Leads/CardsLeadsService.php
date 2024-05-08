<?php

namespace App\Services\Leads;

use App\Models\Leads;
use App\src\Leads\Status\AbertoStatusLeads;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\PreAtendimentoStatusLeads;

class CardsLeadsService
{
    private array $cardsLeads;

    public function getConsultor(int $id)
    {
        $this->cards($id);

        return $this->cardsLeads;
    }

    private function cards($id): void
    {
        $novo = (new NovoStatusLeads())->getStatus();
        $preAtendimento = (new PreAtendimentoStatusLeads)->getStatus();
        $aberto = (new AbertoStatusLeads)->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $ativo = (new AtivoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();

        $leads = (new Leads())->getCards($id);

        $novo = ($this->dados($leads, $novo))->toArray();
        sort($novo);
        $this->cardsLeads['novo'] = $novo;
        $this->cardsLeads['pre_atendimento'] = [...$this->dados($leads, $preAtendimento)];
        $this->cardsLeads['aberto'] = [...$this->dados($leads, $aberto)];
        $this->cardsLeads['atendimento'] = [...$this->dados($leads, $atendimento)];
        $this->cardsLeads['ativo'] = [...$this->dados($leads, $ativo)];
        $this->cardsLeads['finalizado'] = [...$this->dados($leads, $finalizado)];
    }

    private function dados($leads, $status)
    {
        return $leads->where('status', $status)
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'cliente' => [
                        'nome' => $item->nome ?: $item->razao_social,
                        'cidade' => $item->cidade,
                        'estado' => $item->estado,
                    ],
                    'contato' => [
                        'email' => $item->email,
                        'telefone' => converterTelefone($item->telefone),
                    ],
                    'infos' => [
                        'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                    ],
                ];
            });
    }
}
