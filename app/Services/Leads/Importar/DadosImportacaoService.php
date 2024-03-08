<?php

namespace App\Services\Leads\Importar;

class DadosImportacaoService
{
    public function executar(array $dados): array
    {
        $items = [];
        foreach ($dados as $dado) {
            try {
                if ($dado[0] || $dado[1]) $items[] = $this->dados($dado);
            } catch (\ErrorException $exception) {
                throw new \DomainException('Falha na leitura do arquivo!');
            }
        }
        return $items;
    }

    private function dados($dado)
    {
        return [
            'nome' => $dado[0] ?? null,
            'razao_social' => $dado[1] ?? null,
            'cnpj' => $dado[2] ?? null,
            'inscricao_estadual' => $dado[3] ?? null,
            'telefone' => $dado[4] ?? null,
            'email' => $dado[5] ?? null,

            'capital_social' => $dado[6] ?? null,
            'tipo' => $dado[7] ?? null,
            'porte' => $dado[8] ?? null,
            'atividade_principal' => $dado[9] ?? null,
            'natureza_juridica' => $dado[10] ?? null,
            'quadro_societario' => $dado[11] ?? null,
            'data_situacao' => $dado[12] ?? null,
            'data_abertura' => $dado[13] ?? null,

            'endereco' => [
                'cep' => $dado[20] ?? null,
                'rua' => $dado[14] ?? null,
                'numero' => $dado[15] ?? null,
                'complemento' => $dado[16] ?? null,
                'bairro' => $dado[17] ?? null,
                'cidade' => $dado[18] ?? null,
                'estado' => $dado[19] ?? null,
            ],
        ];
    }
}
