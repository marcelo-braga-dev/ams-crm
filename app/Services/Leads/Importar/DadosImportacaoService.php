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
            'cnpj' => $dado[0] ?? null,
            'razao_social' => $dado[1] ?? null,
            'nome' => $dado[2] ?? null,
            'inscricao_estadual' => $dado[3] ?? null,

            'capital_social' => $dado[4] ?? null,
            'tipo' => $dado[5] ?? null,
            'porte' => $dado[6] ?? null,
            'atividade_principal' => $dado[7] ?? null,
            'natureza_juridica' => $dado[8] ?? null,
            'quadro_societario' => $dado[9] ?? null,
            'data_situacao' => $dado[10] ?? null,
            'data_abertura' => $dado[11] ?? null,
            'endereco' => [
                'rua' => $dado[12] ?? null,
                'numero' => $dado[13] ?? null,
                'complemento' => $dado[14] ?? null,
                'bairro' => $dado[15] ?? null,
                'cidade' => $dado[16] ?? null,
                'estado' => $dado[17] ?? null,
                'cep' => $dado[18] ?? null,
            ],
            'email' => $dado[19] ?? null,
            'telefones' => [
                $dado[20],
                $dado[21],
                $dado[22],
                $dado[23],
                $dado[24],
            ],
        ];
    }
}
