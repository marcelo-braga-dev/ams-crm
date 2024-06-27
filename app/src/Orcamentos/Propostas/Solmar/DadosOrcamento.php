<?php

namespace App\src\Orcamentos\Propostas\Solmar;

use App\Models\Clientes;
use App\Models\ClientesMetas;
use App\Models\Kits;
use App\Models\OrcamentosKits;
use App\Models\Orcamentos;
use App\Models\Trafos;
use App\Models\User;

abstract class DadosOrcamento
{
    private int $idOrcamento;
    private $orcamento;
    private $cliente;
    private $kit;
    private $vendedor;
    private $orcamentoKits;
    private $trafo;
    private $dadosCliente;

    public function __construct(int $idOrcamento)
    {
        $this->idOrcamento = $idOrcamento;
        $this->orcamento = $this->setOrcamento();
        $this->cliente = $this->setCliente();
        $this->vendedor = $this->setVendedor();
        $this->orcamentoKits = $this->setOrcamentoKits($idOrcamento);
        $this->kit = $this->setKit();
        $this->trafo = null;//$this->setTrafo($this->orcamento->trafo);
        $this->dadosCliente = null;//$this->setDadosCliente($this->orcamento->clientes_id);
    }

    private function setOrcamento()
    {
        return null;//Orcamentos::find($this->idOrcamento);
    }

    private function setCliente()
    {
        return null;
    }

    private function setKit()
    {
        return null;
    }

    public function getVendedor()
    {
        return $this->vendedor;
    }

    public function setVendedor()
    {
        return null;
    }

    public function getOrcamento()
    {
        return $this->orcamento;
    }

    public function getCliente()
    {
        return $this->cliente;
    }

    public function getKit()
    {
        return $this->kit;
    }

    public function getTrafo()
    {
        return $this->trafo;
    }

    private function setOrcamentoKits($id)
    {
        return null;
    }

    public function getOrcamentoKit()
    {
        return $this->orcamentoKits;
    }

    private function setTrafo($id)
    {
        return null;
    }

    public function getDadosCliente()
    {
        return $this->dadosCliente;
    }

    public function setDadosCliente($id)
    {
        return null;
    }
}
