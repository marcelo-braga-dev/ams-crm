<?php

namespace App\Services\Leads;

use App\Models\Leads;
use App\Models\User;
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
        $nomes = (new User())->getNomes();

        $novo = (new NovoStatusLeads())->getStatus();
        $preAtendimento = (new PreAtendimentoStatusLeads)->getStatus();
        $aberto = (new AbertoStatusLeads)->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $ativo = (new AtivoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();

        $leads = (new Leads())->getCards($id);

        $novo = ($this->dados($leads, $novo, $nomes))->toArray();
        sort($novo);
        $this->cardsLeads['novo'] = $novo;
        $this->cardsLeads['pre_atendimento'] = [...$this->dados($leads, $preAtendimento, $nomes)];
        $this->cardsLeads['aberto'] = [...$this->dados($leads, $aberto, $nomes)];
        $this->cardsLeads['atendimento'] = [...$this->dados($leads, $atendimento, $nomes)];
        $this->cardsLeads['ativo'] = [...$this->dados($leads, $ativo, $nomes)];
        $this->cardsLeads['finalizado'] = [...$this->dados($leads, $finalizado, $nomes)];
    }

    private function dados($leads, $status, $nomes)
    {
        return $leads->where('status', $status)
            ->transform(function ($item) use ($nomes) {
                return [
                    'id' => $item->id,
                    'consultor' => $nomes[$item->user_id] ?? '',
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
