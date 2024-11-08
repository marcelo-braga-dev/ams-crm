<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Models\PedidosAcompanhamentos;
use App\Models\PedidosFretes;
use App\Models\PedidosFretesTransportadoras;
use App\Models\PedidosHistoricos;
use App\Models\PedidosProdutos;
use App\Models\ProdutosFornecedores;
use App\Models\Sac;
use App\Models\Setores;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Pedidos\CardDadosService;
use App\Services\Permissoes\PedidosStatusPermissoesServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $setores = (new Setores())->get();
        $fornecedores = (new ProdutosFornecedores())->get();
        $usuarios = (new User())->subordinados();
        $coresAbas = (new ConfigCores())->getPedidos();
        $goCard = $request->id_card;
        $permissoesStatus = (new PedidosStatusPermissoesServices())->permissoesUsuario(id_usuario_atual());

        return Inertia::render(
            'Admin/Pedidos/Index',
            compact('fornecedores', 'usuarios', 'setores', 'permissoesStatus', 'coresAbas', 'goCard')
        );
    }

    public function show($id)
    {
        $transportadoras = (new PedidosFretesTransportadoras())->get();

        $pedido = (new Pedidos())->getDadosPedido($id);
        $historico = (new PedidosHistoricos())->historico($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);
        $historicoAcompanhamento = (new PedidosAcompanhamentos())->get($id);
        $sacHistorico = (new Sac())->pedido($id);
        $anotacoesHistorico = (new Pedidos\PedidosAnotacoes())->getDados($id);

        $urlPrevious = go_card($id);

        return Inertia::render(
            'Admin/Pedidos/Show',
            compact('pedido', 'historico', 'produtos', 'transportadoras', 'anotacoesHistorico', 'historicoAcompanhamento', 'sacHistorico', 'urlPrevious')
        );
    }

    public function edit($id)
    {
        $pedido = (new Pedidos())->getDadosPedido($id);
        $usuarios = (new User())->getUsuarios($pedido['pedido']['setor_id'], false);

        return Inertia::render('Admin/Pedidos/Edit', compact('pedido', 'usuarios'));
    }

    public function update($id, Request $request)
    {
        (new Pedidos())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function destroy($id)
    {
        (new Pedidos())->remove($id);

        return redirect()->back();
    }

    public function pedidos(Request $request)
    {
        $setorAtual = null;
        if ($request->setor == 'todos') {
            session(['sessaoSetor' => null]);
        } elseif ($request->setor) {
            $setorAtual = $request->setor;
            $dadosSetor = (new Setores())->find($setorAtual);
            session(['sessaoSetor' => $dadosSetor]);
        }

        $sessao = session('sessaoSetor');
        $setorPedidos = $sessao['id'] ?? $setorAtual;

        $pedidos = (new CardDadosService())->getCards($request->usuario, $request->fornecedor, $setorPedidos);

        return response()->json(['pedidos' => $pedidos, 'modelo' => modelo_setor($setorPedidos), 'setor' => $setorPedidos]);
    }
}
