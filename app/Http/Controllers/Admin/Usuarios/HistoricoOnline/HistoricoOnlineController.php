<?php

namespace App\Http\Controllers\Admin\Usuarios\HistoricoOnline;

use App\Http\Controllers\Controller;
use App\Models\UsersOnlineHistorico;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricoOnlineController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $tempoOnline = (new UsersOnlineHistorico())->tempoOnline($mes);

        return Inertia::render('Admin/Usuarios/HistoricoOnline/index',
            compact('tempoOnline'));
    }
}
