<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\PedidosImagens;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturadoController extends Controller
{
    public function show($id)
    {
        $files = (new PedidosImagens())->getImagens($id);

        return Inertia::render('Consultor/Pedidos/Faturado/Show',
            compact('id', 'files'));
    }
}
