<?php

namespace App\Http\Controllers\Admin\Usuarios\HistoricoOnline;

use App\Http\Controllers\Controller;
use App\Models\UsersOnlineHistorico;
use Inertia\Inertia;

class HistoricoOnlineController extends Controller
{
    public function index()
    {
        $tempoOnline = (new UsersOnlineHistorico())->tempoOnline($mes = 2);
//        print_pre($tempoOnline);
        return Inertia::render('Admin/Usuarios/HistoricoOnline/index',
            compact('tempoOnline'));
    }
}
