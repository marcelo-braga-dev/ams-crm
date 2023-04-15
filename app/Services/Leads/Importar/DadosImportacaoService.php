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
                throw new \DomainException();
            }
        }
        return $items;
    }

    private function dados($dado)
    {
        return [
            'nome' => $dado[0],
            'razao_social' => $dado[1],
            'cnpj' => $dado[2],
            'inscricao_estadual' => $dado[3],
            'atendente' => $dado[4],
            'telefone' => $dado[5],
            'email' => $dado[6],
            'cidade' => $dado[7],
            'estado' => $dado[8],
            'anotacoes' => $dado[9],
        ];
    }
}
