<?php

namespace App\Http\Controllers\Consultor\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SacNotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->sac());

        return Inertia::render('Consultor/Notificacoes/Sac', compact('notificacoes'));
    }

    public function show()
    {
        return response()->json((new Notificacoes())->countNotificacoes())
            ->header('x-inertia', true);
    }

    public function update($id, Request $request)
    {
        (new Notificacoes())->alterarAlerta($id, $request->get('status'));
    }

    public function destroy()
    {
        (new Notificacoes())->deletar((new NotificacoesCategorias())->sac());

        return redirect()->back();
    }

    public function marcarLidas()
    {
        (new Notificacoes())->marcarTodasLidas((new NotificacoesCategorias)->sac());

        return redirect()->back();
    }
}
