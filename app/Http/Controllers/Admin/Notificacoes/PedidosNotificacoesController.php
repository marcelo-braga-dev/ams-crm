<?php

namespace App\Http\Controllers\Admin\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosNotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->pedidos(), 100);

        return Inertia::render('Admin/Notificacoes/Index', compact('notificacoes'));
    }

    public function show()
    {
        // Retorna quantidade de notificoes ativas
    }

    public function update($id, Request $request)
    {
        (new Notificacoes())->alterarAlerta($id, $request->get('status'));
    }

    public function marcarLidas()
    {
        (new Notificacoes())->marcarTodasLidas((new NotificacoesCategorias)->pedidos());

        return redirect()->back();
    }

    public function destroy()
    {
        (new Notificacoes())->deletar((new NotificacoesCategorias())->pedidos());

        return redirect()->back();
    }
}
