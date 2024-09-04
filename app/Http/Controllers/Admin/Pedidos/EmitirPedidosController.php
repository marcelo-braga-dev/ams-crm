<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\Leads\Leads;
use App\Models\Produtos;
use App\Models\ProdutosCategorias;
use App\Models\ProdutosFornecedores;
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
        $consultores = (new LeadsUsuariosService())->get();
        $idUsuarioAtual = id_usuario_atual();

        return Inertia::render(
            'Admin/Pedidos/Emitir/Index',
            compact('consultores', 'idUsuarioAtual')
        );
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
                    'Admin/Pedidos/Emitir/Modelo1/Create',
                    compact('fornecedores', 'lead')
                );
            case 2:
                return Inertia::render(
                    'Admin/Pedidos/Emitir/Modelo2/Create',
                    compact('fornecedores', 'lead', 'endereco', 'categorias', 'unidades')
                );
            default: {
                    modalErro('Falha no formulário de cadastro.');
                    return redirect()->back();
                }
        }
    }

    public function store(Request $request)
    {
        try {
            $id = (new Pedido())->salvar($request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
        // print_pre('FIM_1');
        modalSucesso('Pedido cadastrado com sucesso!');
        return redirect()->route('admin.pedidos.index', ['id_card' => $id]);
    }

    public function buscarProdutosFornecedor(Request $request)
    {
        return (new Produtos())->getProdutosFormulario($request);
    }
}
