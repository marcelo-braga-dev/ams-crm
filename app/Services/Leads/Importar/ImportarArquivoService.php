<?php

namespace App\Services\Leads\Importar;

class ImportarArquivoService
{
    public function dados($request)
    {
        if ($request->hasFile('arquivo')) {
            $file = $request->file('arquivo');
            if ($file->isValid()) {
                $dados = $this->armazenaArquivo($file);
                return $this->linhas($dados);
            }
        }
        throw new \DomainException('Arquivo Não Encontrado!');
    }

    private function linhas($dados)
    {
        $file = fopen($dados, 'r');

        $linhas = [];
        $i = 0;
        while (($data = fgetcsv($file, null, ';')) !== FALSE) {
            $i++;
            if ($i > 1) {
                $item = array_map(function ($item) {return utf8_encode($item);}, $data);
                $linhas[] = $item;
            }
        }
        fclose($file);

        return $linhas;
    }

    private function armazenaArquivo($file)
    {
        $extension = $file->getClientOriginalExtension();
        if ($extension != 'csv')
            throw new \DomainException('Arquivo Inválido! (formato: '. $extension . ')');

        return $file->move(storage_path('importacao'), uniqid() . '.' . $extension);
    }
}
