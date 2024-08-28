<?php

namespace App\src\Usuarios\Permissoes;


use App\src\Leads\StatusLeads\AFazerStatusLeads;
use App\src\Leads\StatusLeads\ConcluidoStatusLeads;
use App\src\Leads\StatusLeads\EmProgressoStatusLeads;
use App\src\Leads\StatusLeads\FinalizadosStatusLeads;
use App\src\Leads\StatusLeads\InativoStatusLeads;
use App\src\Leads\StatusLeads\InicioFunilStatusLeads;
use App\src\Leads\StatusLeads\NovoStatusLeads;
use App\src\Leads\StatusLeads\RevisaoStatusLeads;

class LeadsKanban extends ChavesPermissoes
{
    public function permissoes(): array
    {
        return [
            ['id' => $this->chaveLeadsStatusInicioFunil(), 'nome' => 'Inicio Funil'],
            ['id' => $this->chaveLeadsStatusNovos(), 'nome' => 'Novos'],
            ['id' => $this->chaveLeadsStatusFazer(), 'nome' => 'A Fazer'],
            ['id' => $this->chaveLeadsStatusProgresso(), 'nome' => 'Progresso'],
            ['id' => $this->chaveLeadsStatusRevisao(), 'nome' => 'Revisão'],
            ['id' => $this->chaveLeadsStatusConcluido(), 'nome' => 'Concluídos'],
            ['id' => $this->chaveLeadsStatusFinalizados(), 'nome' => 'Finalizados'],
            ['id' => $this->chaveLeadsStatusInativos(), 'nome' => 'Inativos'],
        ];
    }

    public function permissoesStatusLeads(): array
    {
        return [
            $this->chaveLeadsStatusInicioFunil(),
            $this->chaveLeadsStatusNovos(),
            $this->chaveLeadsStatusFazer(),
            $this->chaveLeadsStatusProgresso(),
            $this->chaveLeadsStatusRevisao(),
            $this->chaveLeadsStatusConcluido(),
            $this->chaveLeadsStatusFinalizados(),
            $this->chaveLeadsStatusInativos(),
        ];
    }

    public function permissoesStatus($status): string
    {
        $items = [
            $this->chaveLeadsStatusInicioFunil() => (new InicioFunilStatusLeads())->status(),
            $this->chaveLeadsStatusNovos() => (new NovoStatusLeads())->status(),
            $this->chaveLeadsStatusFazer() => (new AFazerStatusLeads())->status(),
            $this->chaveLeadsStatusProgresso() => (new EmProgressoStatusLeads())->status(),
            $this->chaveLeadsStatusRevisao() => (new RevisaoStatusLeads())->status(),
            $this->chaveLeadsStatusConcluido() => (new ConcluidoStatusLeads())->status(),
            $this->chaveLeadsStatusFinalizados() => (new FinalizadosStatusLeads())->status(),
            $this->chaveLeadsStatusInativos() => (new InativoStatusLeads())->status(),
        ];

        return $items[$status];
    }
}
