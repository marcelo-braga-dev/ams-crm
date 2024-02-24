<?php

namespace App\Http\Controllers\Admin\Usuarios\Consultor;

use App\Http\Controllers\Controller;
use App\Models\Franquias;
use App\Models\Setores;
use App\Models\User;
use App\src\Usuarios\Funcoes\Vendedores;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultoresController extends Controller
{
    public function index()
    {
        $tipo = (new Vendedores())->getFuncao();
        $consultores = (new User())->newQuery()->where('tipo', $tipo)->get();

        return Inertia::render('Admin/Usuarios/Consultores/Index', compact('consultores'));
    }

    public function create()
    {
        $setores = (new Setores())->setores();
        $superiores = (new User())->getSupervisores();
        $franquias = (new Franquias())->get();

        return Inertia::render('Admin/Usuarios/Consultores/Create',
            compact('setores', 'superiores', 'franquias'));
    }

    public function store(Request $request)
    {
        (new Usuarios())->cadastrar($request, new Vendedores);

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
        $superiores = (new User())->getSupervisores();
        $franquias = (new Franquias())->get();

        return Inertia::render('Admin/Usuarios/Consultores/Edit',
            compact('usuario', 'franquias', 'setores', 'superiores'));
    }

    public function update($id, Request $request)
    {
        try {
            (new User())->updateDados($id, $request);
            (new User())->setFoto($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->route('admin.usuarios.consultores.show', $id);
        }

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('admin.usuarios.consultores.show', $id);
    }
}
