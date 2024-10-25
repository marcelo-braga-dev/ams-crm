<?php

namespace App\src\Usuarios\Permissoes;


use App\src\Leads\StatusLeads\ConexaoProativaStatusLead;
use App\src\Leads\StatusLeads\AtivoStatusLead;
use App\src\Leads\StatusLeads\ContatoDiretoStatusLead;
use App\src\Leads\StatusLeads\FinalizadoStatusLead;
use App\src\Leads\StatusLeads\InativoStatusLead;
use App\src\Leads\StatusLeads\InicioFunilStatusLead;
use App\src\Leads\StatusLeads\OportunidadeStatusLead;
use App\src\Leads\StatusLeads\CotacaoEnviadoStatusLead;

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
            $this->chaveLeadsStatusInicioFunil() => (new InicioFunilStatusLead())->getStatus(),
            $this->chaveLeadsStatusNovos() => (new OportunidadeStatusLead())->getStatus(),
            $this->chaveLeadsStatusFazer() => (new ConexaoProativaStatusLead())->getStatus(),
            $this->chaveLeadsStatusProgresso() => (new ContatoDiretoStatusLead())->getStatus(),
            $this->chaveLeadsStatusRevisao() => (new CotacaoEnviadoStatusLead())->getStatus(),
            $this->chaveLeadsStatusConcluido() => (new AtivoStatusLead())->getStatus(),
            $this->chaveLeadsStatusFinalizados() => (new FinalizadoStatusLead())->getStatus(),
            $this->chaveLeadsStatusInativos() => (new InativoStatusLead())->getStatus(),
        ];

        return $items[$status];
    }
}
