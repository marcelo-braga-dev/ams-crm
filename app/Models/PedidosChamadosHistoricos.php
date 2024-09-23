<?php

namespace App\Models;

use App\Services\UploadFiles;
use App\src\Chamados\StatusChamados;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosChamadosHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'user_id',
        'chamados_id',
        'status',
        'msg',
        'anexo_1',
        'anexo_2',
        'prazo'
    ];

    public function create($idPedidos, $idChamado, $status, $msg, $prazo, $anexos)
    {
        foreach ($anexos as $anexo) {
            $anexo2 = (new UploadFiles())->armazenarSeparado($anexo, 'chamados-anexos');
        }

        $this->newQuery()
            ->create([
                'pedido_id' => $idPedidos,
                'user_id' => auth()->id(),
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
            ->where('pedido_id', $id)
            ->delete();
    }
}
