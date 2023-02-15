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
        $users = (new User())->getAll();
        $dados = (new UsuariosService())->todos();

        $adminTipo = (new Admins)->getTipo();
        $supervisorTipo = (new Supervisores())->getTipo();
        $consultorTipo = (new Consultores())->getTipo();

        $usuarios['admins'] = [];
        $usuarios['supervisores'] = [];
        $usuarios['consultores'] = [];

        foreach ($dados as $user) {
            switch ($user['tipo']) {
                case $adminTipo:
                    $usuarios['admins'][] = $user;
                    break;
                case $supervisorTipo:
                    $usuarios['supervisores'][] = $user;
                    break;
                case $consultorTipo:
                    $usuarios['consultores'][] = $user;
                    break;
            }
        }

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
