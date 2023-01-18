<?php

namespace App\Http\Controllers\Supervisor\Usuarios;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Supervisores;
use Inertia\Inertia;

class UsuariosController extends Controller
{
    public function index()
    {
        $users = (new User())->getAll();

        $adminTipo = (new Admins)->getTipo();
        $supervisorTipo = (new Supervisores())->getTipo();
        $consultorTipo = (new Consultores())->getTipo();

        $usuarios['admins'] = [];
        $usuarios['supervisores'] = [];
        $usuarios['consultores'] = [];

        foreach ($users as $user) {
            switch ($user->tipo) {
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

        return Inertia::render('Supervisor/Usuarios/Index', compact('usuarios'));
    }
}
