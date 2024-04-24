<?php

namespace App\Http\Controllers\Admin\Usuarios\Funcoes;

use App\Http\Controllers\Controller;
use App\Models\UsersFuncoes;
use App\Models\UsersFuncoesPermissoes;
use App\Models\UsersPermissoes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FuncoesController extends Controller
{
    public function index()
    {
        $funcoes = (new UsersFuncoes())->getAll();

        return Inertia::render('Admin/Usuarios/Funcoes/Index', compact('funcoes'));
    }

    public function create()
    {
        $permissoes = (new UsersPermissoes())->getAll();

        return Inertia::render('Admin/Usuarios/Funcoes/Create', compact('permissoes'));
    }

    public function store(Request $request)
    {
        (new UsersFuncoes())->create($request);

        modalSucesso('Função cadastrada com sucesso!');
        return redirect()->route('admin.usuarios.funcoes.index');
    }

    public function show($id)
    {
        $funcao = (new UsersFuncoes())->find($id);

        $funcao->permissoes = (new UsersFuncoesPermissoes())->funcao($id);

        return Inertia::render('Admin/Usuarios/Funcoes/Show', compact('funcao'));
    }
}
