<?php

namespace App\Http\Controllers\Admin\Usuarios\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Setores;
use App\Models\User;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Supervisores;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisoresController extends Controller
{
    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Usuarios/Supervisores/Create', compact('setores'));
    }

    public function show($id)
    {
        $usuario = (new User())->get($id);

        return Inertia::render('Admin/Usuarios/Supervisores/Show', compact('usuario'));
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new Supervisores());

        modalSucesso('Cadastrado com sucesso!');
        return redirect()->route('admin.usuarios.usuario.index');
    }

    public function edit($id)
    {
        $usuario = (new User())->get($id);
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Usuarios/Supervisores/Edit',
            compact('usuario', 'setores'));
    }

    public function update($id, Request $request)
    {
        try {
            (new User())->updateDados($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->route('admin.usuarios.supervisores.show', $id);
        }

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('admin.usuarios.supervisores.show', $id);
    }
}
