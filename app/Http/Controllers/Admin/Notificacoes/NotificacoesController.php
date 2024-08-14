<?php

namespace App\Http\Controllers\Admin\Notificacoes;

use App\Http\Controllers\Controller;
use App\Models\ChatInterno;
use App\Models\Notificacoes;
use App\Models\UsersOnlineHistorico;
use Illuminate\Http\Request;

class NotificacoesController extends Controller
{
    public function index()
    {
        $notificacoes = (new Notificacoes())->count();
        $userOnline = (new UsersOnlineHistorico())->usuariosOnline();
        $chatInterno = (new ChatInterno())->qtdNovas();

        return ['tarefas' => 0, 'email' => 0, 'agenda' => 0, 'chat_interno' => $chatInterno, 'user_online' => $userOnline, ...$notificacoes];
    }
}
