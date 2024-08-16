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
            'tipo' => $dado[1] ?? null,
            'razao_social' => $dado[2] ?? null,
            'nome' => $dado[3] ?? null,
            'data_abertura' => $dado[4] ?? null,
            'natureza_juridica' => $dado[5] ?? null,
            'data_situacao' => $dado[6] ?? null,
            'atividade_principal' => $dado[8] ?? null,
            'porte' => $dado[12] ?? null,
            'email' => $dado[13] ?? null,
            'endereco' => [
                'rua' => $dado[16] ?? null,
                'numero' => $dado[17] ?? null,
                'complemento' => $dado[18] ?? null,
                'bairro' => $dado[19] ?? null,
                'cidade' => $dado[20] ?? null,
                'estado' => $dado[21] ?? null,
                'cep' => $dado[22] ?? null,
            ],
            'telefones' => [
                $dado[27] ?? null,//cel
                $dado[28] ?? null,
                $dado[23] ?? null,
                $dado[24] ?? null,
                $dado[25] ?? null,
                $dado[26] ?? null,
            ],
            'quadro_societario' => (($dado[30] ?? null) . ' ' . ($dado[29] ?? null)) .
                (($dado[32] ?? null) ? (' & ' . $dado[32] . ' ' . ($dado[31] ?? null)) : '') .
                (($dado[34] ?? null) ? (' & ' . $dado[34] . ' ' . ($dado[33] ?? null)) : '') .
                (($dado[36] ?? null) ? (' & ' . $dado[36] . ' ' . ($dado[35] ?? null)) : ''),
//            'inscricao_estadual' => $dado[3] ?? null,

//            'capital_social' => $dado[4] ?? null,
        ];
    }
}
