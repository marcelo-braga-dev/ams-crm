<?php

namespace App\Models;

use App\src\Chamados\StatusChamados;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosChamados extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedidos_id',
        'consultor',
        'admin',
        'cliente',
        'status',
        'status_data',
        'titulo',
        'prazo'
    ];

    public function create($idPedido, $titulo, $status, $prazo, $mensagem)
    {
        $idConsultor = (new Pedidos())->getIdConsultor($idPedido);
        $idCliente = (new PedidosClientes())->getIdCliente($idPedido);

        $dados = $this->newQuery()
            ->create([
                'pedidos_id' => $idPedido,
                'consultor' => $idConsultor,
                'admin' => auth()->id(),
                'cliente' => $idCliente,
                'status' => $status,
                'status_data' => now(),
                'titulo' => $titulo,
                'prazo' => $prazo,
            ]);

        // Cria historico
        (new PedidosChamadosHistoricos())->create($idPedido, $dados->id, $status, $mensagem, $prazo);

        // Seta SAC no pedido
        (new Pedidos())->updateChamado($idPedido, 1);

        modalSucesso('SAC criado com sucesso!');
    }

    // Retorna Infos do Chamado
    public function get($id)
    {
        $dados = $this->newQuery()->findOrFail($id);

        return [
            'id' => $id,
            'id_pedido' => $dados->pedidos_id,
            'cliente' => getNomeCliente($dados->pedidos_id),
            'status' => (new StatusChamados())->getNomeStatus($dados->status),
            'titulo' => $dados->titulo,
            'prazo' => $dados->prazo,
            'data' => date('d/m/y H:i', strtotime($dados->status_data))
        ];
    }

    // Retorna Chamados do Consultor
    public function getConsultor()
    {
        return $this->newQuery()
            ->where('consultor', auth()->id())->get();
    }

    // Atualiza Status do Chamado
    public function updateStatus(int $id, string $status, int $prazo)
    {
        $this->newQuery()
            ->where('pedidos_id', $id)
            ->update([
                'status' => $status,
                'status_data' => now(),
                'admin' => auth()->id(),
                'prazo' => $prazo
            ]);
    }

    public function getChamadosPedido($id)
    {
        return $this->newQuery()
            ->where('pedidos_id', $id)
            ->get();
    }

    public function dadosCardAdmin()
    {
        return $this->newQuery()->get();
    }

    public function remover($id)
    {
        $this->newQuery()
            ->where('pedidos_id', $id)
            ->delete();
    }
}
