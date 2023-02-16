<?php

namespace App\Http\Controllers\Admin\Usuarios\Consultor;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Setores;
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
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Usuarios/Consultores/Create',
            compact('setores'));
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

        return Inertia::render('Admin/Usuarios/Consultores/Show', compact('usuario'));
    }

    public function edit($id)
    {
        $usuario = (new User())->get($id);
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Usuarios/Consultores/Edit',
            compact('usuario', 'setores'));
    }

    public function update($id, Request $request)
    {
        try {
            (new User())->updateDados($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->route('admin.usuarios.consultores.show', $id);
        }

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('admin.usuarios.consultores.show', $id);
    }
}
