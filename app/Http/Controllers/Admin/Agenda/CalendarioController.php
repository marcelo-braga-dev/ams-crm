<?php

namespace App\Http\Controllers\Admin\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Calendario;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Models\User;
use App\Services\Usuarios\UsuariosService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CalendarioController extends Controller
{
    public function index()
    {
        $pedidos = (new Pedidos())->newQuery()->get(['id', 'status', 'status_data', 'prazo']);

        $prazosPedidos = [];
        foreach ($pedidos as $pedido) {
            if ($pedido->status !== 'entregue' && $pedido->status !== 'cancelado') {
                $ano = date('Y', strtotime($pedido->status_data));
                $mes = date('m', strtotime($pedido->status_data));
                $dia = date('d', strtotime('+' . $pedido->prazo . ' days', strtotime($pedido->status_data)));

                $prazosPedidos[$ano][intval($mes)][intval($dia)][] = [
                    'id' => $pedido->id,
                    'status' => $pedido->status
                ];
            }
        }

        $calendario = (new Calendario())->newQuery()->get();
        $nomes = (new User())->getNomes();
        $avisosCalendario = [];
        foreach ($calendario as $item) {
            $ano = date('Y', strtotime($item->data));
            $mes = date('m', strtotime($item->data));
            $dia = date('d', strtotime($item->data));

            $avisosCalendario[$ano][intval($mes)][intval($dia)][] = [
                'nome' => $nomes[$item->users_id],
                'msg' => $item->msg
            ];
        }

        $coresPedidos = (new ConfigCores())->getPedidos();

        return Inertia::render('Admin/Calendario/Index',
            compact('prazosPedidos', 'avisosCalendario', 'coresPedidos'));
    }

    public function create()
    {
        $usuarios = (new UsuariosService())->todos();

        return Inertia::render('Admin/Calendario/Create', compact('usuarios'));
    }

    public function store(Request $request)
    {
        (new Calendario())->create($request);

        modalSucesso('Informações armazenas com sucesso!');
        return redirect()->route('admin.agenda.calendario.index');
    }
}
