<?php

namespace App\Http\Controllers\Consultor\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Calendario;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Services\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarioController extends Controller
{
    public function index()
    {
        $prazosPedidos = (new Pedidos())->prazos(id_usuario_atual());

        $avisosCalendario = (new Calendario())->mensagens(id_usuario_atual());

        $coresPedidos = (new ConfigCores())->getPedidos();

        return Inertia::render('Consultor/Calendario/Index',
            compact('prazosPedidos', 'avisosCalendario', 'coresPedidos'));
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
        return redirect()->route('admin.agenda.calendario.index');
    }
}
