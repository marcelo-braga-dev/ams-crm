<?php

namespace App\Http\Controllers\Admin\Pedidos\Modelo2;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\PedidosArquivos;
use App\Models\PedidosImagens;
use App\Models\PedidosProdutos;
use App\Models\Produtos;
use App\Models\ProdutosHistoricos;
use App\src\Pedidos\Arquivos\ArquivosPedido;
use App\src\Pedidos\Arquivos\ChavesArquivosPedidos;
use App\src\Pedidos\PedidoUpdateStatus;
use App\src\Produtos\ProdutosStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LancadoController extends Controller
{
    public function show($id)
    {
        $dados = (new Pedidos())->getDadosPedido($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);

        return Inertia::render('Admin/Pedidos/Modelo2/Lancado/Show',
            compact('dados', 'produtos'));
    }

    public function update($id, Request $request)
    {
        try {
            if ($request->file_boletos)
                foreach ($request->file_boletos as $index => $files) {
                    $url = (new ArquivosPedido())->inserirAquivo($files['file'], 'pedidos/' . $id);
                    (new PedidosArquivos())
                        ->insert($id, (new ChavesArquivosPedidos())->boleto(), $url, $index, $files['vencimento']);
                }

            (new PedidosImagens())->updateNotaFiscal($id, $request);
            (new PedidosImagens())->updateLinkPagamento($id, $request);

            $produtos = (new PedidosProdutos())->getProdutosPedido($id);

            foreach ($produtos as $item) {
                $produto = (new Produtos())->find($item['id_produto']);
                (new ProdutosHistoricos())->create($produto, (new ProdutosStatus())->venda(), $request['consultor'], $item['qtd']);
            }

            if ($request->forma_pagamento == 'vista') (new PedidoUpdateStatus())->setFaturadoVista($id);
            if ($request->forma_pagamento == 'prazo') (new PedidoUpdateStatus())->setFaturadoPrazo($id);

        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Atualizado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }
}
