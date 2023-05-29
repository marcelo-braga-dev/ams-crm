<?php

namespace App\Models;

use App\Services\Images;
use App\src\Chamados\StatusChamados;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosChamadosHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedidos_id',
        'users_id',
        'chamados_id',
        'status',
        'msg',
        'anexo_1',
        'anexo_2',
        'prazo'
    ];

    public function create($idPedidos, $idChamado, $status, $msg, $prazo, $dados)
    {
        $anexo1 = (new Images())->armazenar($dados, 'anexo_1', 'chamados-anexos');
        $anexo2 = (new Images())->armazenar($dados, 'anexo_2', 'chamados-anexos');

        $this->newQuery()
            ->create([
                'pedidos_id' => $idPedidos,
                'users_id' => auth()->id(),
                'chamados_id' => $idChamado,
                'status' => $status,
                'msg' => $msg,
                'anexo_1' => $anexo1,
                'anexo_2' => $anexo2,
                'prazo' => $prazo,
            ]);

        modalSucesso('Mensagem registrada!');
    }

    public function getMensagens($id)
    {
        return $this->newQuery()->where('chamados_id', $id)->get();
    }

    public function remover($id)
    {
        $this->newQuery()
            ->where('pedidos_id', $id)
            ->delete();
    }
}
