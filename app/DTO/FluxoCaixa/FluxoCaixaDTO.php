<?php

namespace App\DTO\FluxoCaixa;

class FluxoCaixaDTO
{
    public int $userId;
    public string $tipo;
    public int $empresaId;
    public int $franquiaId;
    public int $fornecedorId;
    public int $origemId;
    public string $descricao;
    public ?string $nota;
    public ?string $emissao;
    public $anexo;

    public array $pagamentos; // Array de PagamentoDTO

    public function __construct($tipo, $empresaId, $franquiaId, $fornecedorId, $origemId, $descricao, $nota, $emissao, $anexo, array $pagamentos = [])
    {
        $this->userId = id_usuario_atual();
        $this->tipo = $tipo;
        $this->empresaId = $empresaId;
        $this->franquiaId = $franquiaId;
        $this->fornecedorId = $fornecedorId;
        $this->origemId = $origemId;
        $this->descricao = $descricao;
        $this->nota = $nota;
        $this->emissao = $emissao;
        $this->anexo = $anexo;
        $this->pagamentos = $pagamentos;
    }

    // Método para criar o DTO a partir de um array (por exemplo, request)
    public static function fromArray($data)
    {
        $pagamentosDTO = [];
        if (isset($data['pagamentos']) && is_array($data['pagamentos'])) {
            foreach ($data['pagamentos'] as $pagamentoData) {
                $pagamentosDTO[] = FluxoCaixaPagamentoDTO::fromArray($pagamentoData);
            }
        }

        return new self(
            $data['tipo'] ?? null,
            $data['empresa_id'] ?? null,
            $data['franquia_id'] ?? null,
            $data['fornecedor_id'] ?? null,
            $data['origem_id'] ?? null,
            $data['descricao'] ?? null,
            $data['nota'] ?? null,
            $data['emissao'] ?? null,
            $data['anexo'] ?? null,
            $pagamentosDTO
        );
    }

    // Método para converter o DTO em array (útil para salvar no banco)
    public function toArray()
    {
        $pagamentosArray = [];
        foreach ($this->pagamentos as $pagamentoDTO) {
            $pagamentosArray[] = $pagamentoDTO->toArray();
        }

        return [
            'user_id' => $this->userId,
            'tipo' => $this->tipo,
            'empresa_id' => $this->empresaId,
            'franquia_id' => $this->franquiaId,
            'fornecedor_id' => $this->fornecedorId,
            'origem_id' => $this->origemId,
            'descricao' => $this->descricao,
            'nota' => $this->nota,
            'emissao' => $this->emissao,
            'anexo' => $this->anexo,
            'pagamentos' => $pagamentosArray,
        ];
    }
}
