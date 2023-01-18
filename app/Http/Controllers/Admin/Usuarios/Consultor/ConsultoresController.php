<?php

namespace App\Http\Controllers\Admin\Usuarios\Consultor;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\User;
use App\src\Pedidos\StatusPedidos;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultoresController extends Controller
{
    public function index()
    {
        $tipo = (new Consultores())->getTipo();
        $consultores = (new User())->newQuery()->where('tipo', $tipo)->get();

        return Inertia::render('Admin/Usuarios/Consultores/Index', compact('consultores'));
    }

    public function create()
    {
        return Inertia::render('Admin/Usuarios/Consultores/Create');
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new Consultores);

        modalSucesso('Cadastrado com sucesso!');
        return redirect()->route('admin.usuarios.usuario.index');
    }

    public function show($id)
    {
        $usuario = (new User())->get($id);

        $pedidos = (new Pedidos())->getPedidosUsuario($id);

        return Inertia::render('Admin/Usuarios/Consultores/Show', compact('usuario', 'pedidos'));
    }

    public function edit($id)
    {
        $usuario = (new User())->get($id);

        return Inertia::render('Admin/Usuarios/Consultores/Edit', compact('usuario'));
    }

    public function update($id, Request $request)
    {
        (new User())->updateDados($id, $request);

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('admin.usuarios.consultores.show', $id);
    }
}
