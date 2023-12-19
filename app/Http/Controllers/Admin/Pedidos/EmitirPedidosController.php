<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Clientes;
use App\Models\Enderecos;
use App\Models\Fornecedores;
use App\Models\Leads;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosUnidades;
use App\Models\Setores;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use App\src\Pedidos\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmitirPedidosController extends Controller
{
    public function index()
    {
        $qtdLeads = (new LeadsUsuariosService())->get();

        return Inertia::render('Admin/Pedidos/Emitir/Index', compact('qtdLeads'));
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
                return Inertia::render('Admin/Pedidos/Emitir/Modelo1/Create',
                    compact('fornecedores', 'lead'));
            case 2:
                return Inertia::render('Admin/Pedidos/Emitir/Modelo2/Create',
                    compact('fornecedores', 'lead', 'clientes', 'endereco', 'categorias', 'unidades'));
            default:
            {
                modalErro('Falha no formulário de cadastro.');
                return redirect()->back();
            }
        }
    }

    public function store(Request $request)
    {
        try {
            (new Pedido())->salvar($request);
        } catch (\DomainException) {
            modalErro('Falha do cadastro do pedido.');
            return redirect()->back();
        }

        modalSucesso('Pedido cadastrado com sucesso!');
        return redirect()->route('admin.pedidos.index');
    }

    public function buscarProdutosFornecedor(Request $request)
    {
        return (new Produtos())->getProdutosFormulario($request);
    }
}
