<?php

namespace App\Http\Controllers\Admins\Agenda;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarioController extends Controller
{
    public function index()
    {
        $pedidos = (new Pedidos())->newQuery()->get();

        $prazosPedidos = [];
        foreach ($pedidos as $pedido) {
            $ano = date('Y', strtotime($pedido->status_data));
            $mes = date('m', strtotime($pedido->status_data));
            $dia = date('d', strtotime($pedido->status_data));

            $prazosPedidos[$ano][$mes == 10 ? $mes : str_replace('0', '', $mes)][$dia][] = $pedido->id;
        }

        return Inertia::render('Admin/Calendario/Index', compact('prazosPedidos'));
    }
}
