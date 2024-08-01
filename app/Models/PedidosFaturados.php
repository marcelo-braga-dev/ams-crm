<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFaturados extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'exportacao_id',
        'n_nota',
        'data_nota',
        'status',
        'status_data'
    ];

    public function create($id, $dados)
    {
        $this->newQuery()
            ->create([
                'pedido_id' => $id,
                'n_nota' => $dados->n_nota,
                'data_nota' => $dados->nota_data,
            ]);
    }

    public function createPlanilha($idExportacao, $vendas)
    {
        foreach ($vendas as $venda) {
            $this->newQuery()
                ->updateOrCreate(
                    ['pedido_id' => $venda['id']],
                    ['exportacao_id' => $idExportacao,]
                );
        }

    }
}
