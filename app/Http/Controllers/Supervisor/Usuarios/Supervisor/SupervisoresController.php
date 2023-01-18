<?php

namespace App\Http\Controllers\Supervisor\Usuarios\Supervisor;

use App\Http\Controllers\Controller;
use App\src\Usuarios\Supervisores;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisoresController extends Controller
{
    public function create()
    {
        return Inertia::render('Supervisor/Usuarios/Supervisores/Create');
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new Supervisores());

        modalSucesso('Cadastrado com sucesso!');
        return redirect()->route('admin.usuarios.usuario.index');
    }
}
