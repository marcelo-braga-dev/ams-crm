<?php

namespace App\Models;

use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\PedidosStatus;
use App\src\Pedidos\StatusPedidos;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedidos_id',
        'users_id',
        'status',
        'prazo',
        'obs'
    ];

    function create(int $id, string $status, int $prazo, ?string $obs)
    {
        (new PedidosHistoricos())->newQuery()
            ->create([
                'pedidos_id' => $id,
                'users_id' => auth()->id(),
                'status' => $status,
                'prazo' => $prazo,
                'obs' => $obs,
            ]);
    }

    function historico(int $id)
    {
        $historico = $this->newQuery()
            ->where('pedidos_id', $id)->get();

        $nomes = (new User())->getNomes();

        return $historico->map(function ($dados) use ($nomes) {
            return [
                'id' => $dados->id,
                'data' => date('d/m/y H:i', strtotime($dados->created_at)),
                'status' => (new StatusPedidos())->getNomeStatus($dados->status),
                'usuario' => $nomes[$dados->users_id] ?? '-',
                'prazo' => $dados->prazo,
                'obs' => $dados->obs
            ];
        });
    }

    public function getMsg($idPedido, PedidosStatus $status)
    {
        return $this->newQuery()
            ->where('pedidos_id', $idPedido)
            ->where('status', $status->getStatus())
            ->first()->obs ?? '';
    }

    public function getPrazoEntreguaRetroceder($id)
    {
        return $this->newQuery()
            ->where('pedidos_id', $id)
            ->where('status', (new FaturadoStatus())->getStatus())
            ->orderByDesc('id')
            ->first()
            ->prazo ?? 0;
    }

    public function remover($id)
    {
        $this->newQuery()
            ->where('pedidos_id', $id)
            ->delete();
    }
}
