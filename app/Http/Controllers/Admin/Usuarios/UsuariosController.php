<?php

namespace App\Http\Controllers\Admin\Usuarios;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Usuarios\UsuariosService;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Supervisores;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuariosController extends Controller
{
    public function index()
    {
        $dados = (new User())->usuarios();

        $adminTipo = (new Admins)->getFuncao();
        $supervisorTipo = (new Supervisores())->getFuncao();
        $consultorTipo = (new Consultores())->getFuncao();

        $usuarios['admins'] = [...$dados->where('tipo', $adminTipo)];
        $usuarios['supervisores'] = [...$dados->where('tipo', $supervisorTipo)];
        $usuarios['consultores'] = [...$dados->where('tipo', $consultorTipo)];

        return Inertia::render('Admin/Usuarios/Index', compact('usuarios'));
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
