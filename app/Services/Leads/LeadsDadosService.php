<?php

namespace App\Services\Leads;

use App\Models\Leads\Leads;
use App\Models\User;

class LeadsDadosService
{
    private array $consultores;

    public function __construct()
    {
        $this->consultores = (new User())->getNomeConsultores();
    }

    public function getAll(int $categoria): array
    {
        $dados = (new Leads())->getResumido($categoria);

        return $this->dados($dados);
    }

    /**
     * @deprecated
     */
    public function lead($id): array
    {
        $dados = (new Leads())->find($id);

        return $this->items($dados);
    }

    private function dados($items): array
    {
        $dados = [];

        foreach ($items as $item) {
            $dados[] = $this->items($item);
        }
        return $dados;
    }

    private function items($item): array
    {
        if (!$item) return [];

        return [
            'id' => $item->id,
            'consultor' => [
                'nome' => $this->consultores[$item->user_id] ?? '',
                'id' => $item->user_id
            ],
            'cliente' => [
                'nome' => $item->nome,
                'razao_social' => $item->razao_social,
                'cnpj' => converterCNPJ($item->cnpj),
                'rg' => $item->rg,
                'cpf' => $item->cpf,
                'cidade' => $item->cidade,
                'estado' => $item->estado,
                'endereco' => $item->endereco ? getEnderecoCompleto($item->endereco) : '',
                'pessoa' => $item->pessoa_fisica ? 'PF' : 'PJ',
                'classificacao' => $item->classificacao
            ],
            'contato' => [
                'email' => $item->email,
                'telefone' => converterTelefone($item->telefone),
                'atendente' => $item->atendente,
            ],
            'infos' => [
                'setor' => $item->setor,
                'status' => $item->status,
                'status_anotacoes' => $item->status_anotacoes,
                'anotacoes' => $item->infos,
                'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                'contato' => $item->meio_contato,
                'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
            ],
        ];
    }

    public function getOcultos($setor): array
    {
        $dados = (new Leads())->getOcultos($setor);

        return $this->dados($dados);
    }
}
