<?php

namespace App\Http\Controllers\Admin\Home;

use Inertia\Inertia;
use App\Models\Notificacoes;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\UsersOnlineHistorico;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;

class HomeController extends Controller
{
    public function index()
    {
        $notificacoesPedidos = (new Notificacoes())->getUsuario((new NotificacoesCategorias())->pedidos(), 5);

        return Inertia::render('Admin/Home/Index', compact('notificacoesPedidos'));
    }
}
