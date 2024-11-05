<?php

namespace App\Http\Controllers\Geral\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\Pedidos\PedidosAnotacoes;
use App\Models\PedidosAcompanhamentos;
use App\Models\PedidosFretesTransportadoras;
use App\Models\PedidosHistoricos;
use App\Models\PedidosProdutos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosFornecedores;
use App\Models\ProdutosUnidades;
use App\Models\Sac;
use App\Models\Setores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function create(Request $request)
    {
        $setor = setor_usuario_atual();

        $fornecedores = (new ProdutosFornecedores())->getAll($setor);
        $lead = (new LeadsANTIGO())->find($request->lead);

        $endereco = (new Enderecos())->get($lead->endereco);
        $categorias = (new ProdutosCategorias())->categorias(setor_usuario_atual());
        $unidades = (new ProdutosUnidades())->get();

        switch ((new Setores())->getModelo($setor)) {
            case 1:
                return Inertia::render(
                    'Consultor/Pedidos/Create/Modelo1/Create',
                    compact('fornecedores', 'lead', 'endereco')
                );
            case 2:
                return Inertia::render(
                    'Consultor/Pedidos/Create/Modelo2/Create',
                    compact('fornecedores', 'lead', 'endereco', 'categorias', 'unidades')
                );
            default:
            {
                modalErro('Falha no formulário de cadastro.');
                return redirect()->back();
            }
        }
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

        return Inertia::render('Geral/Pedidos/Show/Show',
            compact('pedido', 'historico', 'produtos', 'transportadoras', 'anotacoesHistorico', 'historicoAcompanhamento', 'sacHistorico', 'urlPrevious'));
    }

    public function addAnotacoes(Request $request)
    {
        (new PedidosAnotacoes())->create($request->pedido_id, $request->mensagem);

        modalSucesso('Anotação cadastrada com sucesso.');
        return redirect()->back();
    }
}
