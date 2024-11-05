<?php

namespace App\Http\Controllers\Admin\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Calendario;
use App\Models\ConfigCores;
use App\Models\Franquias;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Usuarios\UsuariosService;
use App\src\Calendario\Agenda\Status\StatusAgenda;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CalendarioController extends Controller
{
    public function index()
    {
        $coresPedidos = (new ConfigCores())->getPedidos();

        return Inertia::render(
            'Admin/Calendario/Index',
            compact('coresPedidos')
        );
    }

    public function create()
    {
        $usuarios = (new UsuariosService())->ativos();
        $franquias = (new Franquias())->get();
        $setores = (new Setores())->getSetoresFranquias();
        $usuarios = (new User())->usuarios(true);

        return Inertia::render(
            'Admin/Calendario/Create',
            compact('usuarios', 'franquias', 'setores', 'usuarios')
        );
    }

    public function store(Request $request)
    {
        (new Calendario())->create($request);

        modalSucesso('Informações armazenas com sucesso!');
        return redirect()->route('admin.agenda.calendario.index');
    }

    public function show($id)
    {
        $dados = (new Calendario())->getDados($id);
        $destinatarios = (new Calendario())->getDestinatarios($id);
        $status = (new StatusAgenda())->statusConvidado();

        return Inertia::render(
            'Admin/Calendario/Show',
            compact('dados', 'destinatarios', 'status')
        );
    }

    public function registros(Request $request)
    {
        $tipoPedidos = !$request->tipos || in_array('pedidos', $request->tipos);

        $prazosPedidos = $tipoPedidos ? (new Pedidos())->prazos() : [];
        $reunioes = (new Calendario())->getRegistros(id_usuario_atual(), $request);

        return ['pedidos' => $prazosPedidos, 'reunioes' => $reunioes];
    }

    public function alterarStatus(Request $request)
    {
        (new Calendario())->alterarStatus($request->id, $request->status);

        modalSucesso('Status Alterado com sucesso!');
        return redirect()->back();
    }

    public function destroy($id)
    {
        (new Calendario())->deletar($id);

        modalSucesso('Registro deletado com sucesso!');
        return redirect()->route('admin.agenda.calendario.index');
    }
}
