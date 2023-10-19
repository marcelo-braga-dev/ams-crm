<?php

namespace App\Models;

use App\src\Pedidos\Arquivos\ChavesArquivosPedidos;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosArquivos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedidos_id',
        'chave',
        'valor',
        'indice',
        'data'
    ];

    public function insert($id, $chave, $valor, $indice = 1, $data = null): void
    {
        $this->newQuery()
            ->where('pedidos_id', $id)
            ->updateOrCreate(
                ['pedidos_id' => $id, 'chave' => $chave, 'indice' => $indice],
                ['valor' => $valor, 'data' => $data]
            );
    }

    public function getBoletos($id)
    {
        return $this->newQuery()
            ->where('pedidos_id', $id)
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
            ->where('pedidos_id', $id)
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
}
