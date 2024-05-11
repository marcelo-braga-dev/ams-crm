<?php

namespace App\Http\Controllers\Admin\Usuarios;

use App\Http\Controllers\Controller;
use App\Models\Franquias;
use App\Models\Setores;
use App\Models\User;
use App\Models\UsersFuncoes;
use App\Models\UsersHierarquias;
use App\Models\UsersPermissoes;
use App\src\Usuarios\Funcoes\Admins;
use App\src\Usuarios\Funcoes\Vendedores;
use App\src\Usuarios\Funcoes\Supervisores;
use App\src\Usuarios\Permissoes\PermissoesUsuarios;
use App\src\Usuarios\Usuarios;
use DomainException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuariosController extends Controller
{
    public function index(Request $request)
    {
        $status = !$request->status;
        // $dados = (new User())->usuarios($status);

        // $usuarios['admins'] = [...$dados->where('tipo', (new Admins)->getFuncao())];
        // $usuarios['supervisores'] = [...$dados->where('tipo', (new Supervisores())->getFuncao())];
        // $usuarios['consultores'] = [...$dados->where('tipo', (new Vendedores())->getFuncao())];

        $contas = (new User)->contas();

        return Inertia::render(
            'Admin/Usuarios/Index',
            compact('contas',  'status')
        );
    }

    public function show($id)
    {
        $usuario = (new User())->get($id);

        return Inertia::render('Admin/Usuarios/Show', compact('usuario'));
    }

    public function create()
    {
        $franquias = (new Franquias())->get();;
        $setores = (new Setores())->setores();
        $funcoes = (new UsersFuncoes())->getAll();
        $permissoes = (new PermissoesUsuarios())->permissoes();

        return Inertia::render(
            'Admin/Usuarios/Create',
            compact('funcoes', 'franquias', 'setores', 'permissoes')
        );
    }

    public function store(Request $request)
    {
        try {
            $id = (new User())->create($request);
            (new UsersPermissoes())->atualizar($id, $request->permissoes);

            modalSucesso('Usuário cadastrado com sucesso!');
            return redirect()->route('admin.usuarios.usuario.index');
        } catch (DomainException $e) {
            modalErro($e->getMessage());
            return redirect()->back();
        }
    }

    public function edit($id)
    {
        $usuario = (new User())->get($id);
        $franquias = (new Franquias())->get();
        $setores = (new Setores())->setores();
        $funcoes = (new UsersFuncoes())->getAll();
        $permissoes = (new PermissoesUsuarios())->permissoes();
        $permissoesUsuario = (new UsersPermissoes())->permissoes($id);

        $usuarios = (new User())->allUsers();
        $supervisionados = (new UsersHierarquias())->idSupervisonados($id);

        return Inertia::render(
            'Admin/Usuarios/Edit',
            compact('usuario', 'supervisionados', 'usuarios', 'funcoes', 'franquias', 'setores', 'permissoes', 'permissoesUsuario')
        );
    }

    public function update($id, Request $request)
    {
        // print_pre($request->all());
        (new User())->atualizar($id, $request);
        (new UsersPermissoes())->atualizar($id, $request->permissoes);
        (new UsersHierarquias())->atualizar($id, $request->supervisionados);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function updateSenha($id, Request $request)
    {
        try {
            (new Usuarios())->alterarSenha($id, $request);
        } catch (\DomainException $exception) {
            return redirect()->back()->withErrors($exception->getMessage());
        }

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.usuarios.consultores.show', $id);
    }
}
