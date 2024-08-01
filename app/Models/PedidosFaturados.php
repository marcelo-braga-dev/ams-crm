<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFaturados extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'empresa_id',
        'nota_numero',
        'nota_distribuidora_numero',
        'nota_data'
    ];

    public function create($id, $dados)
    {
        $this->newQuery()
            ->create([
                'pedido_id' => $id,
                'nota_numero' => $dados->n_nota,
                'nota_data' => $dados->nota_data,
            ]);
    }

    public function updateNotaDistribuidora($vendas, $pedidos, $notaDistribuidora, $empresa)
    {
        foreach ($vendas as $venda) {
            if (in_array($venda['id'], $pedidos)) {
                $this->newQuery()
                    ->updateOrCreate(
                        ['pedido_id' => $venda['id']],
                        ['nota_distribuidora_numero' => $notaDistribuidora, 'empresa_id' => $empresa]
                    );
            }
        }

    }
}
