<?php

namespace App\Http\Controllers\Consultor\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\src\Pedidos\NotificacoesCategorias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosNotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->pedidos());

        return Inertia::render('Consultor/Notificacoes/Index', compact('notificacoes'));
    }

    public function show()
    {
        // Retorna quantidade de notificoes ativas
        return (new Notificacoes())->countNotificacoes(auth()->id());
    }

    public function update($id, Request $request)
    {
        (new Notificacoes())->alterarAlerta($id, $request->get('status'));
    }
}
