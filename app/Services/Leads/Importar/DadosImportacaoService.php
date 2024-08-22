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
}
