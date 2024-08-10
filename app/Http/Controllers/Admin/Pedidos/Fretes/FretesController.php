<?php

namespace App\Http\Controllers\Admin\Pedidos\Fretes;

use App\Http\Controllers\Controller;
use App\Models\PedidosFretes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FretesController extends Controller
{
    public function index()
    {
        $registros = (new PedidosFretes())->get();

        return Inertia::render('Admin/Pedidos/Fretes/Index', compact('registros'));
    }

    public function update($id, Request $request)
    {
        (new PedidosFretes())->atualizar($id, $request);

        modalSucesso('Frete atualizado com sucesso.');
        return redirect()->back();
    }
}
