<?php

namespace App\Http\Controllers\Consultor\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Clientes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientesController extends Controller
{
    public function index()
    {
        $clientes = (new Clientes())->getClientes(setor_usuario_atual());

        return Inertia::render('Consultor/Pedidos/Clientes/Index',
            compact('clientes'));
    }

    public function show($id)
    {
        $cliente = (new Clientes())->getCliente($id);

        return Inertia::render('Consultor/Pedidos/Clientes/Index',
            compact('cliente'));
    }
}
