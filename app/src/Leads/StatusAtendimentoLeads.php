<?php

namespace App\src\Leads;

use App\Models\LeadsStatus;
use App\src\Leads\Historicos\IniciarAtendimentoHistorico;

class StatusAtendimentoLeads
{
    public function getStatus()
    {
        $status = (new LeadsStatus())->statusCategorias();
        $ativado = (new IniciarAtendimentoHistorico());

        $items = [
            'pedido_emitido' =>  'Pedido Emitido',
            'finalizado' => 'Atendimento Finalizado',
            $ativado->status() => $ativado->msg(),

            //remover
            'nao_encontrado' => 'Não encontrado',
            'nao_interessado' => 'Não Interessado',
            'atendido' => 'Atendido',
            'ligacao_realizada' => 'Ligação Realizada',
            'sem_retorno' => 'Sem Retorno',
            'atendimento_campo' => 'Atendimento a Campo',
        ];

        foreach ($status as $item) {
            $items[$item['id']] = $item['nome'];
        }

        return $items;
    }

    public function status()
    {
        $status = (new LeadsStatus())->statusCategoria(setor_usuario_atual());

        $items = [];
        foreach ($status as $item) {
            $items[] = [
                'status' => $item['id'],
                'nome' => $item['nome'],
            ];
        }
        return $items;
    }
}
