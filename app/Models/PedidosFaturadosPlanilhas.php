<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFaturadosPlanilhas extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'nota_distribuidora',
        'empresa_id',
        'fornecedor_id',
        'anotacoes'
    ];

    public function create($file, $nota, $empresa, $distribuidora = null, $anotacoes = null)
    {
        $this->newQuery()
            ->create([
                'empresa_id' => $empresa,
                'nota_distribuidora' => $nota,
                'url' => $file,
                'fornecedor_id' => $distribuidora,
                'anotacoes' => $anotacoes,
            ]);
    }

    public function planilhas()
    {
        return $this->newQuery()
            ->leftJoin('financeiros_empresas', 'pedidos_faturados_planilhas.empresa_id', '=', 'financeiros_empresas.id')
            ->leftJoin('produtos_fornecedores', 'pedidos_faturados_planilhas.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->orderByDesc('id')
            ->select([
                'pedidos_faturados_planilhas.*',
                'financeiros_empresas.nome AS empresa_nome',
                'produtos_fornecedores.nome AS distribuidora_nome',
            ])
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nota_distribuidora' => $item->nota_distribuidora,
                    'empresa_nome' => $item->empresa_nome,
                    'anotacoes' => $item->anotacoes,
                    'distribuidora_nome' => $item->distribuidora_nome,
                    'url' => asset($item->url),
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });
    }

    public function atualizarAnotacao($id, $anotacao)
    {
        $this->newQuery()
            ->where('id', $id)
            ->update(['anotacoes' => $anotacao]);
    }
}
