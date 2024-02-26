<?php

namespace App\Models;

use App\src\Chamados\StatusChamados;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosChamados extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'consultor',
        'admin',
        'cliente',
        'status',
        'status_data',
        'titulo',
        'prazo'
    ];

    public function create($idPedido, $titulo, $status, $prazo, $mensagem, $anexos)
    {
        $idConsultor = (new Pedidos())->getIdConsultor($idPedido);
        $idCliente = (new PedidosClientes())->getIdCliente($idPedido);

        $dados = $this->newQuery()
            ->create([
                'pedido_id' => $idPedido,
                'consultor' => $idConsultor,
                'admin' => auth()->id(),
                'cliente' => $idCliente,
                'status' => $status,
                'status_data' => now(),
                'titulo' => $titulo,
                'prazo' => $prazo,
            ]);

        // Cria historico
        (new PedidosChamadosHistoricos())->create($idPedido, $dados->id, $status, $mensagem, $prazo, $anexos);

        // Seta SAC no pedido
        (new Pedidos())->updateChamado($idPedido, 1);

        modalSucesso('SAC criado com sucesso!');
    }

    // Retorna Infos do Chamado
    public function get($id)
    {
        $dados = $this->newQuery()->findOrFail($id);

        return $this->dados($dados);
    }

    // Atualiza Status do Chamado
    public function updateStatus(int $id, string $status, int $prazo)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status,
                'status_data' => now(),
                'admin' => auth()->id(),
                'prazo' => $prazo
            ]);
    }

    public function getChamadosPedido($id)
    {
        $items = $this->newQuery()
            ->where('pedido_id', $id)
            ->get();

        $chamados = [];
        foreach ($items as $item) {
            $chamados[] = $this->dados($item);
        }

        return $chamados;
    }

    // Retorna todos chamados
    public function dadosCardAdmin()
    {
        return $this->newQuery()->get();
    }

    // Retorna chamados do Consultor
    public function dadosCardConsultor()
    {
        return $this->newQuery()
            ->where('consultor', id_usuario_atual())
            ->get();
    }

    public function remover($id)
    {
        $this->newQuery()
            ->where('pedido_id', $id)
            ->delete();
    }

    private function dados($dados)
    {
        return [
            'id' => $dados->id,
            'id_pedido' => $dados->pedido_id,
            'cliente' => getNomeCliente($dados->pedido_id),
            'status' => (new StatusChamados())->getNomeStatus($dados->status),
            'titulo' => $dados->titulo,
            'prazo' => $dados->prazo,
            'data' => date('d/m/y H:i', strtotime($dados->status_data))
        ];
    }
}
