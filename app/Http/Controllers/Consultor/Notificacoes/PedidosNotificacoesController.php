<?php

namespace App\Http\Controllers\Consultor\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosNotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->pedidos());

        return Inertia::render('Consultor/Notificacoes/Pedidos', compact('notificacoes'));
    }

    public function show()
    {

    }

    public function update($id, Request $request)
    {
        (new Notificacoes())->alterarAlerta($id, $request->get('status'));
    }

    public function destroy()
    {
        (new Notificacoes())->deletar((new NotificacoesCategorias())->pedidos());

        return redirect()->back();
    }

    public function marcarLidas()
    {
        (new Notificacoes())->marcarTodasLidas((new NotificacoesCategorias)->pedidos());

        return redirect()->back();
    }
}
