<?php

namespace App\Services\Leads;

use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\CanceladoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;

class CardsLeadsService
{
    private array $cards;

    public function getConsultor(int $id)
    {
        $this->cards($id);

        return $this->cards;
    }

    private function cards($id): void
    {
        $novo = (new NovoStatusLeads())->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $ativo = (new AtivoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();
        $cancelado = (new CanceladoStatusLeads())->getStatus();

        $msg = (new LeadsHistoricos())->ultimaMsg();
        $leads = (new Leads())->getCards($id);

        $novo = ($this->dados($leads, $novo, $msg, 'asc'))->toArray();
        sort($novo);
        $this->cards['novo'] = $novo;
        $this->cards['atendimento'] = [...$this->dados($leads, $atendimento, $msg, 'desc')];
        $this->cards['ativo'] = [...$this->dados($leads, $ativo, $msg, 'desc')];
        $this->cards['finalizado'] = [...$this->dados($leads, $finalizado, $msg, 'desc')];
        $this->cards['cancelado'] = [...$this->dados($leads, $cancelado, $msg, 'desc')];
    }

    private function dados($leads, $status, $msg, $order)
    {
        return $leads->where('status', $status)
            ->transform(function ($item) use ($msg) {
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
                        'ultima_msg' => $msg[$item->id]['msg'] ?? null,
                        'data_ultima_msg' => $msg[$item->id]['data'] ?? null,
                        'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                    ],
                ];
            });
    }
}
