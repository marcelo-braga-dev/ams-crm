<?php

namespace App\src\Leads;

class StatusAtendimentoLeads
{
    public function getStatus()
    {
        return [
            'nao_encontrado' => 'Não encontrado',
            'nao_interessado' => 'Não Interessado',
            'atendido' => 'Atendido',
            'ligacao_realizada' => 'Ligação Realizada',
            'sem_retorno' => 'Sem Retorno',
        ];
    }

    public function status()
    {
        return [
            ['status' => 'nao_encontrado', 'nome' => 'Não encontrado'],
            ['status' => 'nao_interessado', 'nome' => 'Não Interessado'],
            ['status' => 'atendido', 'nome' => 'Atendido'],
            ['status' => 'ligacao_realizada', 'nome' => 'Ligação Realizada'],
            ['status' => 'sem_retorno', 'nome' => 'Sem Retorno'],
        ];
    }
}
