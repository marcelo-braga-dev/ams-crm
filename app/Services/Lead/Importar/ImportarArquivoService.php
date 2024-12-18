<?php

namespace App\Services\Lead\Importar;

use App\Models\LeadsImportarHistoricos;
use Illuminate\Http\Request;

class ImportarArquivoService
{
    public function getDadosArquivo(Request $request, $idHistorico)
    {
        if ($request->hasFile('arquivo')) {
            $file = $request->file('arquivo');
            if ($file->isValid()) {
                $dados = $this->armazenaArquivo($file, $idHistorico);
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
                $item = array_map(function ($item) {
                    return mb_convert_encoding($item, 'UTF-8', 'ISO-8859-1');
                }, $data);
                $linhas[] = $item;
            }
        }
        fclose($file);

        return $linhas;
    }

    private function armazenaArquivo($file, $idHistorico)
    {
        $extension = $file->getClientOriginalExtension();

        if ($extension != 'csv') throw new \DomainException('Formato de arquivo Inválido! (formato: ' . $extension . ', deve ser .csv)');

        $path = public_path('storage/importacao');
        $fileName = $file->getClientOriginalName() . '_' . uniqid() . '.' . $extension;
        $urlFile = 'importacao/' . $fileName;

        (new LeadsImportarHistoricos())->setUrlFile($idHistorico, $urlFile);

        return $file->move($path, $fileName);
    }
}
