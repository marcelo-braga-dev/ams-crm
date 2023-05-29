<?php

namespace App\src\Leads;

use App\Models\PedidosChamadosStatus;

class StatusAtendimentoLeads
{
    public function getStatus()
    {
        $status = (new PedidosChamadosStatus())->statusCategorias();

        $items = [
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
        $status = (new PedidosChamadosStatus())->statusCategoria(setor_usuario_atual());

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
