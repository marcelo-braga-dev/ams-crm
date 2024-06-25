<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Enderecos;
use App\Models\Fornecedores;
use App\Models\Leads;
use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Models\PedidosProdutos;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosFornecedores;
use App\Models\ProdutosUnidades;
use App\Models\Sac;
use App\Models\Setores;
use App\Services\Pedidos\CardDadosService;
use App\src\Modelos\CompletoModelo;
use App\src\Modelos\DimenSolar;
use App\src\Modelos\ProdutoModelo;
use App\src\Pedidos\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $coresAbas = (new ConfigCores())->getPedidos();
        $pedidos = (new CardDadosService())->getCards(id_usuario_atual());
        $goCard = $request->id_card;

        switch (modelo_usuario()) {
            case (new CompletoModelo())->modelo():
                return Inertia::render(
                    'Consultor/Pedidos/Index',
                    compact('pedidos', 'coresAbas', 'goCard')
                );
            case (new ProdutoModelo())->modelo():
                return Inertia::render(
                    'Consultor/Pedidos/Modelo2/Index',
                    compact('pedidos', 'coresAbas', 'goCard')
                );
            case (new DimenSolar())->modelo():
                return Inertia::render(
                    'Consultor/Pedidos/Modelo3/Index',
                    compact('pedidos', 'coresAbas', 'goCard')
                );
        }
        print_pre('FALHA AO ENCONTRAR O MODELO');
    }

    public function create(Request $request)
    {
        $setor = setor_usuario_atual();

        $fornecedores = (new ProdutosFornecedores())->getAll($setor);
        $lead = (new Leads())->find($request->lead);

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
            case 3:
                return Inertia::render(
                    'Consultor/Pedidos/Create/Modelo3/Create',
                    compact('lead')
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
        $dados = (new Pedidos())->getDadosPedido($id);

        $historico = (new PedidosHistoricos())->historico($id);
        $produtos = (new PedidosProdutos())->getProdutosPedido($id);
        $sacHistorico = (new Sac())->pedido($id);

        return Inertia::render(
            'Consultor/Pedidos/Show',
            compact('dados', 'historico', 'produtos', 'sacHistorico')
        );
    }

    public function store(Request $request)
    {
        try {
            $idPedido = (new Pedido())->salvar($request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso('Pedido cadastrado com sucesso!');
        return redirect()->route('consultor.pedidos.index', ['id_card' => $idPedido]);
    }

    public function buscarProdutosFornecedor(Request $request)
    {
        return (new Produtos())->getProdutosFormulario($request);
    }
}
