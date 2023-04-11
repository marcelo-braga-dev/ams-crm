<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Models\Setores;
use App\Services\Fornecedores\FornecedoresService;
use App\Services\Pedidos\CardDadosService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $dadosSetor = session('sessaoSetor');
        if ($request->setor == 'todos') {
            session(['sessaoSetor' => null]);
        }
        if ($request->setor) {
            $setorAtual = $request->setor;
            $dadosSetor = (new Setores())->find($setorAtual);
            session(['sessaoSetor' => $dadosSetor]);
        }

        $setorAtual = session('sessaoSetor')['id'] ?? null;

        $setores = (new SetoresService())->setores();

        $fornecedorAtual = $request->fornecedor;
        $fornecedores = (new FornecedoresService())->fornecedores($setorAtual);

        $pedidos = (new CardDadosService())->getCards(null, $fornecedorAtual, $setorAtual);

        $coresAbas = (new ConfigCores())->getPedidos();

        return Inertia::render('Admin/Pedidos/Index',
            compact('pedidos', 'fornecedores', 'fornecedorAtual', 'setores', 'setorAtual', 'coresAbas', 'dadosSetor'));
    }

    public function show($id)
    {
//        print_pre(session('sessaoSetor'));
        $pedido = (new Pedidos())->getDadosPedido($id);
        $historico = (new PedidosHistoricos())->historico($id);

        return Inertia::render('Admin/Pedidos/Show',
            compact('pedido', 'historico'));
    }

    public function destroy($id)
    {
        (new Pedidos())->remove($id);

        return redirect()->back();
    }
}
