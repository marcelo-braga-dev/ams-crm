<?php

namespace App\Http\Resources\Pedido;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidosInstalacoesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pedido_id' => $this->pedido_id,
            'XXXX' => 'XXXXXXXXXXXXXXXX',
            'pedidos' => PedidoResource::collection($this->whenLoaded('pedidos')),
        ];
    }
}
