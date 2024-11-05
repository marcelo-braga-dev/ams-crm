<?php

namespace App\Services\Lead;

use App\Models\Lead\Lead;
use App\Repositories\Lead\LeadRepository;
use App\src\Leads\StatusLeads\AtivoStatusLead;
use App\src\Leads\StatusLeads\ConexaoProativaStatusLead;
use App\src\Leads\StatusLeads\ContatoDiretoStatusLead;
use App\src\Leads\StatusLeads\CotacaoEnviadoStatusLead;
use App\src\Leads\StatusLeads\OportunidadeStatusLead;
use App\src\Leads\StatusLeads\SuperOporunidadeStatusLead;

class UpdateStatusLeadService
{
    protected LeadRepository $leadRepository;
    public int $leadId;
    public string $status;

    public function __construct(int $leadId)
    {
        $this->leadId = $leadId;
        $this->leadRepository = new LeadRepository;
    }

    public function setOportunidadeStatus()
    {
        $leadHasPedidos = Lead::find($this->leadId)->pedidos()->exists();

        if ($leadHasPedidos) {
            $this->setReativarStatus();
            return;
        }

        $this->leadRepository->updateStatus($this->leadId, (new OportunidadeStatusLead));
    }

    public function setConexaoProativaStatus($idLead)
    {
        $this->leadRepository->updateStatus($this->leadId, (new ConexaoProativaStatusLead));
    }

    public function setContatoDiretoStatus($idLead)
    {
        $this->leadRepository->updateStatus($this->leadId, (new ContatoDiretoStatusLead));
    }

    public function setCotacaoEnviadaStatus($idLead)
    {
        $this->leadRepository->updateStatus($this->leadId, (new CotacaoEnviadoStatusLead));
    }

    public function setAtivoStatus($idLead)
    {
        $this->leadRepository->updateStatus($this->leadId, (new AtivoStatusLead));
    }

    public function setReativarStatus()
    {
        $this->leadRepository->updateStatus($this->leadId, (new SuperOporunidadeStatusLead()));
    }
}
