<?php

namespace App\Http\Controllers\Admin\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->getUsuario(auth()->id());

        return Inertia::render('Admin/Notificacoes/Index', compact('notificacoes'));
    }

    public function show()
    {
        // Retorna quantidade de notificoes ativas
        return (new Notificacoes())->countUsuario(auth()->id());
    }

    public function update($id, Request $request)
    {
        (new Notificacoes())->alterarAlerta($id, $request->get('status'));
    }
}
