<?php

namespace App\Http\Controllers\Admin\Usuarios\Admin;

use App\Http\Controllers\Controller;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Usuarios/Admins/Create');
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new Admins());

        modalSucesso('Cadastrado com sucesso!');
        return redirect()->route('admin.usuarios.usuario.index');
    }
}
