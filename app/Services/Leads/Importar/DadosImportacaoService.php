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
            'atendente' => $dado[4] ?? null,
            'telefone' => $dado[5] ?? null,
            'email' => $dado[6] ?? null,
            'cidade' => $dado[7] ?? null,
            'estado' => $dado[8] ?? null,
            'anotacoes' => $dado[9] ?? null,
        ];
    }
}
