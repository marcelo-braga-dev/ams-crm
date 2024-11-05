<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFretes extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'transportadora_id',
        'valor_frete',
        'tipo',
        'rastreio',
        'data_inicio',
        'data_fim',
    ];

    public function create($idPedido, $dados)
    {
        $this->newQuery()
            ->create([
                'pedido_id' => $idPedido,
                'transportadora_id' => $dados->frete_transportadora,
                'valor_frete' => convert_money_float($dados->frete_valor),
                'rastreio' => $dados->frete_rastreio,
            ]);
    }

    public function pedido($id)
    {
        return $this->newQuery()
            ->leftJoin('pedidos_fretes_transportadoras', 'pedidos_fretes.transportadora_id', '=', 'pedidos_fretes_transportadoras.id')
            ->where('pedido_id', $id)
            ->first(['pedidos_fretes.*',
                'pedidos_fretes_transportadoras.nome as transportadora_nome',
                'pedidos_fretes_transportadoras.id as transportadora_id']);
    }

    public function get()
    {
        return $this->newQuery()
            ->leftJoin('pedidos', 'pedidos_fretes.pedido_id', '=', 'pedidos.id')
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->leftJoin('pedidos_fretes_transportadoras', 'pedidos_fretes.transportadora_id', '=', 'pedidos_fretes_transportadoras.id')
            ->get(['pedidos_fretes.*', 'pedidos_fretes_transportadoras.nome as transportadora_nome',
                'leads.razao_social as lead_razao_social', 'leads.nome as lead_nome'])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'pedido_id' => $item->pedido_id,
                    'valor' => $item->valor_frete,
                    'rastreio' => $item->rastreio,
                    'transportadora_nome' => $item->transportadora_nome,
                    'transportadora_id' => $item->transportadora_id,
                    'lead_nome' => $item->lead_nome ?? $item->lead_razao_social,
                ];
            });
    }

    public function atualizar($idPedido, $dados)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['pedido_id' => $idPedido],
                [
                    'transportadora_id' => $dados->frete_transportadora,
                    'valor_frete' => convert_money_float($dados->frete_valor),
                    'rastreio' => $dados->frete_rastreio
                ]
            );
    }
}
