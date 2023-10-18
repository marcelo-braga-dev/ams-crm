<?php

namespace App\Http\Controllers\Supervisor\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->pedidos());

        return Inertia::render('Supervisor/Notificacoes/Index', compact('notificacoes'));
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

    public function destroy()
    {
        (new Notificacoes())->deletar();

        return redirect()->back();
    }

    public function marcarLidas()
    {
        (new Notificacoes())->marcarTodasLidas();

        return redirect()->back();
    }
}
