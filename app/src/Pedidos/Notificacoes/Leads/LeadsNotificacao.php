<?php

namespace App\src\Pedidos\Notificacoes\Leads;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Notificacoes;
use App\Models\User;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Pedidos\Notificacoes\Notificacao;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;

class LeadsNotificacao implements Notificacao
{
    public function getCategoria(): string
    {
        return (new NotificacoesCategorias())->leads();
    }

    public function notificar(int $idUser, int $qtd, array $idLeads): void
    {
        $titulo = 'Recebimento de LEADS.';
        $msg = 'Você recebeu ' . $qtd . ' Leads para realizar atendimento. IDs: #' .
            implode(', #', $idLeads) . '.';

        (new Notificacoes())->create($idUser, $this->getCategoria(), $titulo, $msg);
    }

    public function notificarComentarios(int $idConsultor, ?string $msg, int $idLead): void
    {
        $titulo = 'Comentário adicionado no LEAD #' . $idLead;

        $dadosLead = (new LeadsANTIGO())->find($idLead);

        $novo = (new NovoStatusLeads())->getStatus();
        $atendimento = (new AtendimentoStatusLeads())->getStatus();
        $ativo = (new AtivoStatusLeads())->getStatus();
        $finalizado = (new FinalizadoStatusLeads())->getStatus();

        $url = match ($dadosLead->status) {
            $novo => route('consultor.leads.novo.show', $idLead),
            $atendimento => route('consultor.leads.atendimento.show', $idLead),
            $ativo => route('consultor.leads.ativo.show', $idLead),
            $finalizado => route('consultor.leads.finalizado.show', $idLead),
        };

        (new Notificacoes())->create($idConsultor, $this->getCategoria(), $titulo, $msg, $url);
    }

    public function notificarDuplicidade($msg)
    {
        $titulo = 'Duplicidade de Lead';

        $ids = (new User())->getIdAdmins();
        foreach ($ids as $id) {
            (new Notificacoes())->create($id->id, $this->getCategoria(), $titulo, $msg);
        }
    }
}
