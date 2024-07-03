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
//3, 5, 8, 9
            'capital_social' => $dado[30] ?? null,
            'tipo' => $dado[6] ?? null,
            'porte' => $dado[7] ?? null,
            'atividade_principal' => $dado[4] ?? null,
            'natureza_juridica' => $dado[6] ?? null,
//            'quadro_societario' => $dado[] ?? null,
//            'data_situacao' => $dado[] ?? null,
//            'data_abertura' => $dado[] ?? null,

            'endereco' => [
                'rua' => $dado[10] ?? null,
                'numero' => $dado[11] ?? null,
                'complemento' => $dado[12] ?? null,
                'bairro' => $dado[13] ?? null,
                'cidade' => $dado[14] ?? null,
                'estado' => $dado[15] ?? null,
                'cep' => $dado[16] ?? null,
            ],
            'telefones' => [
                $dado[17] . $dado[18],
                $dado[19] . $dado[20],
                $dado[21] . $dado[22],
                $dado[23] . $dado[24],
                $dado[25] . $dado[26],
                $dado[27] . $dado[28],
            ],
            'email' => $dado[29] ?? null,
        ];

//        return [
//            'nome' => $dado[0] ?? null,
//            'razao_social' => $dado[1] ?? null,
//            'cnpj' => $dado[2] ?? null,
//            'inscricao_estadual' => $dado[3] ?? null,
//            'telefone' => $dado[4] ?? null,
//            'email' => $dado[5] ?? null,
//
//            'capital_social' => $dado[6] ?? null,
//            'tipo' => $dado[7] ?? null,
//            'porte' => $dado[8] ?? null,
//            'atividade_principal' => $dado[9] ?? null,
//            'natureza_juridica' => $dado[10] ?? null,
//            'quadro_societario' => $dado[11] ?? null,
//            'data_situacao' => $dado[12] ?? null,
//            'data_abertura' => $dado[13] ?? null,
//
//            'endereco' => [
//                'cep' => $dado[20] ?? null,
//                'rua' => $dado[14] ?? null,
//                'numero' => $dado[15] ?? null,
//                'complemento' => $dado[16] ?? null,
//                'bairro' => $dado[17] ?? null,
//                'cidade' => $dado[18] ?? null,
//                'estado' => $dado[19] ?? null,
//            ],
//        ];
    }
}
