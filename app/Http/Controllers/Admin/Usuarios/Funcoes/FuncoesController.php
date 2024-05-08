<?php

namespace App\Http\Controllers\Admin\Usuarios\Funcoes;

use App\Http\Controllers\Controller;
use App\Models\UsersFuncoes;
use App\src\Usuarios\Permissoes\PermissoesUsuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FuncoesController extends Controller
{
    public function index()
    {
        $funcoes = (new UsersFuncoes())->getAll();
        // print_pre($funcoes);

        return Inertia::render('Admin/Usuarios/Funcoes/Index', compact('funcoes'));
    }

    public function create()
    {
        $permissoes = (new PermissoesUsuarios())->permissoes();

        return Inertia::render('Admin/Usuarios/Funcoes/Create', compact('permissoes'));
    }

    public function edit($id)
    {
        $funcao = (new UsersFuncoes())->find($id);

        return Inertia::render(
            'Admin/Usuarios/Funcoes/Edit',
            compact('funcao',)
        );
    }

    public function update($id, Request $request)
    {
        (new UsersFuncoes())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function store(Request $request)
    {
        (new UsersFuncoes())->create($request);

        modalSucesso('Função cadastrada com sucesso!');
        return redirect()->route('admin.usuarios.funcoes.index');
    }
}
