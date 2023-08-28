<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Clientes;
use App\Models\ClientesArquivos;
use App\Models\ConfigCores;
use App\Models\Fornecedores;
use App\Models\Leads;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\PedidosHistoricos;
use App\Models\PedidosImagens;
use App\Models\Setores;
use App\Services\Pedidos\CardDadosService;
use App\src\Modelos\CompletoModelo;
use App\src\Modelos\SimplesModelo;
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

        switch ((new Setores())->getModelo($setor)) {
            case 1:
                return Inertia::render('Consultor/Pedidos/Create/Modelo1/Create',
                    compact('fornecedores', 'lead'));
            case 2:
                return Inertia::render('Consultor/Pedidos/Create/Modelo2/Create',
                    compact('fornecedores', 'lead', 'clientes'));
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

        return Inertia::render('Consultor/Pedidos/Show',
            compact('dados', 'historico'));
    }

    public function store(Request $request)
    {
        switch (modelo_usuario()) {
            case (new CompletoModelo())->modelo():
                {
                    DB::beginTransaction();
                    try {
                        $idPedido = (new Pedidos())->create($request);
                        (new PedidosClientes())->create($idPedido, $request);
                        (new PedidosImagens())->create($idPedido, $request);
                    } catch (\DomainException|QueryException $exception) {
                        DB::rollBack();
                        modalErro($exception->getMessage());
                        return redirect()->back();
                    }
                    DB::commit();
                };
                break;
            case (new SimplesModelo())->modelo():
                {
                    DB::beginTransaction();
                    try {
                        (new Pedidos())->create($request, $request->id_lead);
                    } catch (\DomainException|QueryException $exception) {
                        DB::rollBack();
                        modalErro($exception->getMessage());
                        return redirect()->back();
                    }
                    DB::commit();
                };
                break;
        }

        modalSucesso('Pedido cadastrado com sucesso!');
        return redirect()->route('consultor.pedidos.index');
    }
}
