<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Clientes;
use App\Models\ConfigCores;
use App\Models\Enderecos;
use App\Models\Fornecedores;
use App\Models\Leads;
use App\Models\Pedidos;
use App\Models\PedidosArquivos;
use App\Models\PedidosClientes;
use App\Models\PedidosHistoricos;
use App\Models\PedidosImagens;
use App\Models\PedidosProdutos;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosTransito;
use App\Models\ProdutosUnidades;
use App\Models\Setores;
use App\Services\Pedidos\CardDadosService;
use App\src\Modelos\CompletoModelo;
use App\src\Modelos\SimplesModelo;
use App\src\Pedidos\Arquivos\ArquivosPedido;
use App\src\Pedidos\Arquivos\ChavesArquivosPedidos;
use App\src\Pedidos\Pedido;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index()
    {
        switch (modelo_usuario()) {
            case (new CompletoModelo())->modelo():
            {
                $pedidos = (new CardDadosService())->getCards(id_usuario_atual());
                $coresAbas = (new ConfigCores())->getPedidos();

                return Inertia::render('Consultor/Pedidos/Index',
                    compact('pedidos', 'coresAbas'));
            }
            case (new SimplesModelo())->modelo():
            {
                $pedidos = (new CardDadosService())->getCards(id_usuario_atual());
                $coresAbas = (new ConfigCores())->getPedidos();

                return Inertia::render('Consultor/Pedidos/Modelo2/Index',
                    compact('pedidos', 'coresAbas'));
            }
        }
        print_pre('FALHA AO ENCONTRAR O MODELO');
    }

    public function create(Request $request)
    {
        $setor = setor_usuario_atual();

        $fornecedores = (new Fornecedores())->getAll($setor);
        $lead = (new Leads())->find($request->lead);

        $clientes = (new Clientes())->getClientes($setor);
        $endereco = (new Enderecos())->get($lead->endereco);
        $categorias = (new ProdutosCategorias())->categorias(setor_usuario_atual());
        $unidades = (new ProdutosUnidades())->get();

        switch ((new Setores())->getModelo($setor)) {
            case 1:
                return Inertia::render('Consultor/Pedidos/Create/Modelo1/Create',
                    compact('fornecedores', 'lead', 'endereco'));
            case 2:
                return Inertia::render('Consultor/Pedidos/Create/Modelo2/Create',
                    compact('fornecedores', 'lead', 'clientes', 'endereco', 'categorias', 'unidades'));
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

        return Inertia::render('Consultor/Pedidos/Show',
            compact('dados', 'historico', 'produtos'));
    }

    public function store(Request $request)
    {
        try{
            (new Pedido())->salvar($request);
        } catch (\DomainException) {
            modalErro('Falha do cadastro do pedido.');
            return redirect()->back();
        }

        modalSucesso('Pedido cadastrado com sucesso!');
        return redirect()->route('consultor.pedidos.index');
    }

    public function buscarProdutosFornecedor(Request $request)
    {
        return (new Produtos())->getProdutosFormulario($request);
    }
}
