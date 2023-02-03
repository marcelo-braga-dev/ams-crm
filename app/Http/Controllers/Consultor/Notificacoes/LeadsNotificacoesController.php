<?php

namespace App\Http\Controllers\Consultor\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\src\Pedidos\NotificacoesCategorias;
use Illuminate\Http\Request;
use Inertia\Inertia;
class LeadsNotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->leads());

        return Inertia::render('Consultor/Notificacoes/Leads', compact('notificacoes'));
    }

    public function show()
    {
        // Retorna quantidade de notificoes ativas
        return (new Notificacoes())->countLeads(auth()->id());
    }

    public function update($id, Request $request)
    {
        (new Notificacoes())->alterarAlerta($id, $request->get('status'));
    }
}
