<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo1;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\VencidoStatusPedido;

class VencidoPedidoController extends Controller
{
    public function show($id)
    {
        (new Pedidos())
            ->find($id)
            ->update([
                'status' => (new AguardandoPagamentoStatus())->getStatus(),
                'pagamento_ignorar_vencimento' => true
            ]);

        modalSucesso('Atualização realizada com sucesso');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }
}
