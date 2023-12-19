<?php

namespace App\src\Pedidos;

use App\Models\Leads;
use App\Models\Pedidos;
use App\Models\PedidosArquivos;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Models\PedidosProdutos;
use App\Models\ProdutosTransito;
use App\src\Modelos\CompletoModelo;
use App\src\Modelos\SimplesModelo;
use App\src\Pedidos\Arquivos\ArquivosPedido;
use App\src\Pedidos\Status\PedidosStatus;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Pedido
{
    public function salvar($request)
    {
        switch (modelo_usuario()) {
            case (new CompletoModelo())->modelo():
                {
                    DB::beginTransaction();
                    try {
                        $lead = (new Leads())->find($request->integrador);
                        $idPedido = (new Pedidos())->create($request, null, $lead->users_id ?? null);
                        (new PedidosClientes())->create($idPedido, $request);
                        (new PedidosImagens())->create($idPedido, $request);
                    } catch (\DomainException|QueryException $exception) {
                        DB::rollBack();
                        modalErro($exception->getMessage());
                        throw new \DomainException();
                    }
                    DB::commit();
                };
                break;
            case (new SimplesModelo())->modelo():
                {
                    DB::beginTransaction();
                    try {
                        (new Leads())->atualizar($request->id_lead, $request);
                        $lead = (new Leads())->find($request->id_lead);
                        $idPedido = (new Pedidos())->create($request, $request->id_lead, $lead->users_id ?? null);

                        (new ArquivosPedido())->comprovantePix($idPedido, $request);
                        (new ArquivosPedido())->cheques($idPedido, $request);

                        (new PedidosImagens())->updatePlanilhaPedido($idPedido, $request);

                        (new PedidosArquivos())->setRG($idPedido, $request);
                        (new PedidosArquivos())->setCPF($idPedido, $request);
                        (new PedidosArquivos())->setCNH($idPedido, $request);

                        (new PedidosProdutos())->create($idPedido, $request);
                        (new ProdutosTransito())->subtrairVendaPedido($request);
                    } catch (\DomainException|QueryException $exception) {
                        DB::rollBack();
                        modalErro($exception->getMessage());
                        throw new \DomainException();
                    }
                    DB::commit();
                };
                break;
        }
    }

    public function updateStatus(int $id, PedidosStatus $pedido, $alerta = null)
    {
        $pedido->updateStatus($id, $alerta);
    }
}
