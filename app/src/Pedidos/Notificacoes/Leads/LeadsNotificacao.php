<?php

namespace App\src\Pedidos\Notificacoes\Leads;

use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\Notificacao;
use App\src\Pedidos\NotificacoesCategorias;

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
}
