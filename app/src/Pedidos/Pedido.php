<?php

namespace App\src\Pedidos;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\PedidosArquivos;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Models\PedidosProdutos;
use App\src\Modelos\CompletoModelo;
use App\src\Modelos\ProdutoModelo;
use App\src\Pedidos\Arquivos\ArquivosPedido;
use App\src\Pedidos\Status\PedidosStatus;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Pedido
{
    public function salvar($request)
    {
        $idPedido = null;

        switch (modelo_usuario()) {
            case (new CompletoModelo())->modelo(): {
                    DB::beginTransaction();
                    try {

                        $idPedido = (new Pedidos())->create($request);

                        (new PedidosClientes())->create($idPedido, $request);
                        (new PedidosImagens())->create($idPedido, $request);
                    } catch (\DomainException | QueryException $exception) {
                        DB::rollBack();
                        modalErro($exception->getMessage());
                        throw new \DomainException($exception->getMessage());
                    }
                    DB::commit();
                };
                break;
            case (new ProdutoModelo())->modelo(): {
                    DB::beginTransaction();
                    try {
//                        (new LeadsANTIGO())->atualizar($request->id_lead, $request);
                        $idPedido = (new Pedidos())->create($request);

                        (new PedidosProdutos())->create($idPedido, $request);
                        (new PedidosProdutos())->setPrecoCustoPedido($idPedido);

                        (new ArquivosPedido())->comprovantePix($idPedido, $request);
                        (new ArquivosPedido())->cheques($idPedido, $request);

                        (new PedidosImagens())->updatePlanilhaPedido($idPedido, $request);

                        (new PedidosArquivos())->setRG($idPedido, $request);
                        (new PedidosArquivos())->setCPF($idPedido, $request);
                        (new PedidosArquivos())->setCNH($idPedido, $request);

                    } catch (\DomainException | QueryException $exception) {
                        DB::rollBack();
                        throw new \DomainException($exception->getMessage());
                    }
                    DB::commit();
                };
                break;
        }

        return $idPedido;
    }

    public function updateStatus(int $id, PedidosStatus $pedido, $alerta = null)
    {
        $pedido->updateStatus($id, $alerta);
    }
}
