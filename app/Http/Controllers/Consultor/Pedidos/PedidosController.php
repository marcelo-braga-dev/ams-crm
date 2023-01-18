<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Integradores;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\PedidosHistoricos;
use App\Models\PedidosImagens;
use App\Services\Pedidos\CardDadosService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index()
    {
        $pedidos = (new CardDadosService())->getCardsConsultor();

        return Inertia::render('Consultor/Pedidos/Index', compact('pedidos'));
    }

    public function create()
    {
        $fornecedores = (new Fornecedores())->getAll();
        $integradores = (new Integradores())->getUsuario();

        return Inertia::render('Consultor/Pedidos/Pedido/Create/Create',
            compact('fornecedores', 'integradores'));
    }

    public function show($id)
    {
        $dados = (new Pedidos())->getV2($id);

        $historico = (new PedidosHistoricos())->historico($id);

        return Inertia::render('Consultor/Pedidos/Show',
            compact('dados', 'historico'));
    }

    public function store(Request $request)//PedidosRequest
    {
        DB::beginTransaction();
        try {
            $idPedido = (new Pedidos())->create($request);
            (new PedidosClientes())->create($idPedido, $request);
            (new PedidosImagens())->create($idPedido, $request);
        } catch (\DomainException | QueryException $exception) {
            DB::rollBack();
            modalErro($exception->getMessage());
            return redirect()->back();
        }
        DB::commit();

        modalSucesso('Pedido cadastrado com sucesso!');
        return redirect()->route('consultor.pedidos.index');
    }
}
