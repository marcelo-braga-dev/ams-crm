<?php

namespace App\Services\Leads\Importar;

class DadosImportacaoService
{
    public function executar(array $dados, $tipoPlanilha, $pessoa): array
    {
        $items = [];
        foreach ($dados as $dado) {
            try {
                if ($pessoa == 'pj') {
                    if ($tipoPlanilha == 'entrada') {
                        if ($dado[0] || $dado[1]) $items[] = $this->dadosPJEntrada($dado);
                    } else {
                        if ($dado[0] || $dado[1]) $items[] = $this->dadosPJ($dado);
                    }

                } else {
                    if ($dado[0] || $dado[1]) $items[] = $this->dadosPF($dado);
                }

            } catch (\ErrorException $exception) {
                throw new \DomainException('Falha na leitura do arquivo!');
            }
        }
        return $items;
    }

    private function dadosPJEntrada($dado)
    {
        return [
            'cnpj' => $dado[0] ?? null,
            'razao_social' => $dado[1] ?? null,
            'nome' => $dado[2] ?? null,
            'tipo' => $dado[19] ?? null,
            'endereco' => [
                'rua' => $dado[4] ?? null,
                'numero' => $dado[5] ?? null,
                'complemento' => $dado[6] ?? null,
                'bairro' => $dado[7] ?? null,
                'cidade' => $dado[8] ?? null,
                'estado' => $dado[9] ?? null,
                'cep' => $dado[11] ?? null,
            ],
            'telefones' => [
                $dado[12] ?? null,//cel
                $dado[13] ?? null,
            ],
            'email' => $dado[14] ?? null,
            'cnae' => $dado[16] ?? null,
            'atividade_principal' => $dado[17] ?? null,
            'situacao' => $dado[21] ?? null,
            'data_situacao' => $dado[22] ?? null,
            'data_abertura' => $dado[24] ?? null,
            'porte' => $dado[29] ?? null,
            'quadro_societario' => (($dado[35] ?? null) . ' ' . ($dado[37] ?? null))
        ];
    }

    private function dadosPJ($dado)
    {
        return [
            'cnpj' => $dado[0] ?? null,
            'tipo' => $dado[1] ?? null,
            'razao_social' => $dado[2] ?? null,
            'nome' => $dado[3] ?? null,
            'data_abertura' => $dado[4] ?? null,
            'cnae' => $dado[5] ?? null,
            'situacao' => $dado[15] ?? null,
            'data_situacao' => $dado[16] ?? null,
            'atividade_principal' => $dado[6] ?? null,
            'porte' => $dado[17] ?? null,
            'email' => $dado[23] ?? null,

            'endereco' => [
                'rua' => $dado[28] ?? null,
                'numero' => $dado[29] ?? null,
                'complemento' => $dado[30] ?? null,
                'bairro' => $dado[31] ?? null,
                'cidade' => $dado[32] ?? null,
                'estado' => $dado[33] ?? null,
                'cep' => $dado[34] ?? null,
            ],
            'telefones' => [
                $dado[87] ?? null,//cel
                $dado[88] ?? null,
                $dado[89] ?? null,
                $dado[90] ?? null,
                $dado[91] ?? null,
                $dado[92] ?? null,
                $dado[93] ?? null,
                $dado[94] ?? null,
                $dado[95] ?? null,
                $dado[96] ?? null,
            ],
            'quadro_societario' => (($dado[109] ?? null) . ' ' . ($dado[108] ?? null)) .
                (($dado[115] ?? null) ? (' & ' . $dado[115] . ' ' . ($dado[114] ?? null)) : '') .
                (($dado[121] ?? null) ? (' & ' . $dado[121] . ' ' . ($dado[120] ?? null)) : '') .
                (($dado[127] ?? null) ? (' & ' . $dado[127] . ' ' . ($dado[126] ?? null)) : '') .
                (($dado[133] ?? null) ? (' & ' . $dado[133] . ' ' . ($dado[132] ?? null)) : '') .
                (($dado[139] ?? null) ? (' & ' . $dado[139] . ' ' . ($dado[138] ?? null)) : '')
        ];
    }

    private function dadosPF($dado)
    {
        return [
            'cpf' => $dado[0] ?? null,
            'nome' => $dado[1] ?? null,
            'sexo' => $dado[2] ?? null,
            'data_nascimento' => $dado[3] ?? null,
            'rg' => $dado[6] ?? null,
            'escolaridade' => $dado[10] ?? null,
            'renda_estimada' => $dado[16] ?? null,
            'faixa_renda' => $dado[17] ?? null,

            'cnpj' => $dado[52] ?? null,
            'nome_fantasia' => $dado[53] ?? null,
            'cnae' => $dado[54] ?? null,
            'atividade_principal' => $dado[55] ?? null,

            'endereco' => [
                'rua' => $dado[23] ?? null,
                'numero' => $dado[24] ?? null,
                'complemento' => $dado[25] ?? null,
                'bairro' => $dado[26] ?? null,
                'cidade' => $dado[27] ?? null,
                'estado' => $dado[28] ?? null,
                'cep' => $dado[29] ?? null,
            ],

            'telefones' => [
                $dado[44] ?? null,//cel
                $dado[45] ?? null,
                $dado[46] ?? null,
                $dado[47] ?? null,
                $dado[40] ?? null,
                $dado[41] ?? null,
                $dado[42] ?? null,
                $dado[43] ?? null,
            ],
            'quadro_societario' => (($dado[63] ?? null) . ' ' . ($dado[62] ?? null)) .
                (($dado[66] ?? null) ? (' & ' . $dado[66] . ' ' . ($dado[65] ?? null)) : '')
        ];
    }
}
