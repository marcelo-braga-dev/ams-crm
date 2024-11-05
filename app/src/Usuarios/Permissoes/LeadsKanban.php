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
use App\src\Leads\StatusLeads\SuperOporunidadeStatusLead;

class LeadsKanban extends ChavesPermissoes
{
    public function permissoes(): array
    {
        return [
            ['id' => $this->chaveLeadsStatusInicioFunil(), 'nome' => 'Inicio Funil'],
            ['id' => $this->chaveLeadsStatusOportunidades(), 'nome' => 'Oportunidades'],
            ['id' => $this->chaveLeadsStatusSuperOportunidades(), 'nome' => 'Super Oportunidades'],
            ['id' => $this->chaveLeadsStatusConexaoProativo(), 'nome' => 'Conexão Proativa'],
            ['id' => $this->chaveLeadsStatusContatoDireto(), 'nome' => 'Contato Direto 360°'],
            ['id' => $this->chaveLeadsStatusCotacaoEnviado(), 'nome' => 'Cotação Enviada'],
            ['id' => $this->chaveLeadsStatusAtivo(), 'nome' => 'Ativos'],
            ['id' => $this->chaveLeadsStatusFinalizados(), 'nome' => 'Finalizados'],
        ];
    }

    public function permissoesStatusLeads(): array
    {
        return [
            $this->chaveLeadsStatusInicioFunil(),
            $this->chaveLeadsStatusOportunidades(),
            $this->chaveLeadsStatusConexaoProativo(),
            $this->chaveLeadsStatusContatoDireto(),
            $this->chaveLeadsStatusCotacaoEnviado(),
            $this->chaveLeadsStatusSuperOportunidades(),
            $this->chaveLeadsStatusAtivo(),
            $this->chaveLeadsStatusFinalizados()
        ];
    }

    public function permissoesStatus($status): string
    {
        $items = [
            $this->chaveLeadsStatusInicioFunil() => (new InicioFunilStatusLead())->getStatus(),
            $this->chaveLeadsStatusOportunidades() => (new OportunidadeStatusLead())->getStatus(),
            $this->chaveLeadsStatusConexaoProativo() => (new ConexaoProativaStatusLead())->getStatus(),
            $this->chaveLeadsStatusContatoDireto() => (new ContatoDiretoStatusLead())->getStatus(),
            $this->chaveLeadsStatusCotacaoEnviado() => (new CotacaoEnviadoStatusLead())->getStatus(),
            $this->chaveLeadsStatusSuperOportunidades() => (new SuperOporunidadeStatusLead())->getStatus(),
            $this->chaveLeadsStatusAtivo() => (new AtivoStatusLead())->getStatus(),
            $this->chaveLeadsStatusFinalizados() => (new FinalizadoStatusLead())->getStatus()
        ];

        return $items[$status];
    }
}
