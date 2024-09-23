<?php

namespace App\Models;

use App\Services\UploadFiles;
use App\src\Pedidos\Arquivos\ChavesArquivosPedidos;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosArquivos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'chave',
        'valor',
        'indice',
        'data'
    ];

    public function insert($id, $chave, $valor, $indice = 1, $data = null): void
    {
        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id, 'chave' => $chave, 'indice' => $indice],
                ['valor' => $valor, 'data' => $data]
            );
    }

    public function getBoletos($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->boleto())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getCheques($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->cheque())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getPix($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->comprovantePix())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getRG($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->rg())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getCPF($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->cpf())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getCNH($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->cnh())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getResidencia($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->residencia())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function getCNPJ($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->where('chave', (new ChavesArquivosPedidos())->cnpj())
            ->orderBy('indice')
            ->get()
            ->transform(function ($item) {
                return [
                    'indice' => $item->indice,
                    'data' => date('d/m/Y', strtotime($item->data)),
                    'url' => $item->valor,
                ];
            });
    }

    public function setRG($idPedido, $request)
    {
        if ($request->img_rg) {
            $url = (new UploadFiles())->armazenar($request, 'img_rg', 'pedidos/' . $idPedido);

            (new PedidosArquivos())->insert($idPedido, (new ChavesArquivosPedidos())->rg(), $url);
        }
    }

    public function setCPF($idPedido, $request)
    {
        if ($request->img_cpf) {
            $url = (new UploadFiles())->armazenar($request, 'img_cpf', 'pedidos/' . $idPedido);

            (new PedidosArquivos())->insert($idPedido, (new ChavesArquivosPedidos())->cpf(), $url);
        }

    }

    public function setCNH($idPedido, $request)
    {
        if ($request->img_cnh) {
            $url = (new UploadFiles())->armazenar($request, 'img_cnh', 'pedidos/' . $idPedido);

            (new PedidosArquivos())->insert($idPedido, (new ChavesArquivosPedidos())->cnh(), $url);
        }
    }

    public function setCNPJ($idPedido, $request)
    {
        if ($request->file_cartao_cnpj) {
            $url = (new UploadFiles())->armazenar($request, 'file_cartao_cnpj', 'pedidos/' . $idPedido);

            (new PedidosArquivos())->insert($idPedido, (new ChavesArquivosPedidos())->cnpj(), $url);
        }
    }

    public function setResidencia($idPedido, $request)
    {
        if ($request->file_comprovante_residencia) {
            $url = (new UploadFiles())->armazenar($request, 'file_comprovante_residencia', 'pedidos/' . $idPedido);

            (new PedidosArquivos())->insert($idPedido, (new ChavesArquivosPedidos())->residencia(), $url);
        }
    }
}
