<?php

namespace App\Models;

use App\Services\Chamados\ChamadoDadosService;
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

        return (new ChamadoDadosService())->dados($dados);
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
            ->where('pedidos_id', $id)
            ->get();

        $chamados = [];
        foreach ($items as $item) {
            $chamados[] = (new ChamadoDadosService())->dados($item);
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
            ->where('pedidos_id', $id)
            ->delete();
    }
}
