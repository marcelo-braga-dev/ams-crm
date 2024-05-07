<?php

namespace App\Http\Controllers\Admin\Usuarios\Funcoes;

use App\Http\Controllers\Controller;
use App\Models\UsersFuncoes;
use App\Models\UsersFuncoesPermissoes;
use App\Models\UsersPermissoes;
use App\src\Usuarios\Permissoes\PermissoesUsuarios;
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
        $permissoes = (new PermissoesUsuarios())->permissoes();

        return Inertia::render('Admin/Usuarios/Funcoes/Create', compact('permissoes'));
    }

    public function edit($id)
    {
        $funcao = (new UsersFuncoes())->find($id);

        $_permissoes = (new PermissoesUsuarios())->permissoes();
        $permissoes = $_permissoes[$funcao->is_admin ? 'admin' : 'geral'];

        $permissoesAtivas = (new UsersFuncoesPermissoes())->get($id);

        return Inertia::render(
            'Admin/Usuarios/Funcoes/Edit',
            compact('funcao', 'permissoes', 'permissoesAtivas')
        );
    }

    public function update($id, Request $request)
    {
        // print_pre($request->all());
        (new UsersFuncoes())->atualizar($id, $request);
        (new UsersFuncoesPermissoes())->atualizar($id, $request->permissoes);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
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
