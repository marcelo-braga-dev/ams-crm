<?php

namespace App\Http\Controllers\Consultor\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Calendario;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Services\Usuarios\UsuariosService;
use App\src\Calendario\Agenda\Status\StatusAgenda;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarioController extends Controller
{
    public function index()
    {
        $coresPedidos = (new ConfigCores())->getPedidos();

        return Inertia::render('Consultor/Calendario/Index',
            compact('coresPedidos'));
    }

    public function create()
    {
        $usuarios = (new UsuariosService())->ativos();

        return Inertia::render('Consultor/Calendario/Create', compact('usuarios'));
    }

    public function store(Request $request)
    {
        (new Calendario())->create($request);

        modalSucesso('Informações armazenas com sucesso!');
        return redirect()->route('consultor.calendario.agenda.index');
    }

    public function show($id)
    {
        $dados = (new Calendario())->getDados($id);
        $destinatarios = (new Calendario())->getDestinatarios($id);
        $status = (new StatusAgenda())->statusConvidado();

        return Inertia::render('Consultor/Calendario/Show',
            compact('dados', 'destinatarios', 'status'));
    }

    public function registros(Request $request)
    {
        $tipoPedidos = !$request->tipos || in_array('pedidos', $request->tipos);

        $prazosPedidos = $tipoPedidos ? (new Pedidos())->prazos(id_usuario_atual()) : [];
        $reunioes = (new Calendario())->getRegistros(id_usuario_atual(), $request);

        return ['pedidos' => $prazosPedidos, 'reunioes' => $reunioes];
    }

    public function alterarStatus(Request $request)
    {
        (new Calendario())->alterarStatus($request->id, $request->status);

        modalSucesso('Status Alterado com sucesso!');
        return redirect()->back();
    }
}
