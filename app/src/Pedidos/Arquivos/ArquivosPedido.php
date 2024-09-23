<?php

namespace App\src\Pedidos\Arquivos;

use App\Models\PedidosArquivos;
use App\Services\UploadFiles;

class ArquivosPedido
{
    public function inserirAquivo($file, $path)
    {
        return (new UploadFiles())->armazenarSeparado($file, $path);
    }

    public function comprovantePix($idPedido, $request)
    {
        if ($request->file_pix) {
            $url = (new ArquivosPedido())->inserirAquivo($request->file_pix, 'pedidos/' . $idPedido);
            (new PedidosArquivos())
                ->insert($idPedido, (new ChavesArquivosPedidos())->comprovantePix(), $url);
        }
    }

    public function cheques($idPedido, $request)
    {
        if ($request->file_cheques) {
            foreach ($request->file_cheques as $index => $files) {
                $url = (new ArquivosPedido())->inserirAquivo($files['file'], 'pedidos/' . $idPedido);
                (new PedidosArquivos())
                    ->insert($idPedido, (new ChavesArquivosPedidos())->cheque(), $url, $index, $files['vencimento']);
            }
        }
    }
}
