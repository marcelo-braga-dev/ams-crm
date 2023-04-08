<?php

namespace App\Http\Controllers\Admin\Usuarios\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setores;
use App\Models\User;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Usuarios/Admins/Create', compact('setores'));
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new Admins());

        modalSucesso('Cadastrado com sucesso!');
        return redirect()->route('admin.usuarios.usuario.index');
    }

    public function update($id, Request $request)
    {
        try {
            (new User())->updateDados($id, $request);
            (new User())->setFoto($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->route('admin.usuarios.supervisores.show', $id);
        }

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('admin.usuarios.supervisores.show', $id);
    }
}
