<?php

namespace App\Http\Controllers\Admin\Usuarios;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\src\Usuarios\Funcoes\Admins;
use App\src\Usuarios\Funcoes\Vendedores;
use App\src\Usuarios\Funcoes\Supervisores;
use App\src\Usuarios\Usuarios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuariosController extends Controller
{
    public function index(Request $request)
    {
        $status = !$request->status;
        $dados = (new User())->usuarios($status);

        $usuarios['admins'] = [...$dados->where('tipo', (new Admins)->getFuncao())];
        $usuarios['supervisores'] = [...$dados->where('tipo', (new Supervisores())->getFuncao())];
        $usuarios['consultores'] = [...$dados->where('tipo', (new Vendedores())->getFuncao())];

        return Inertia::render('Admin/Usuarios/Index',
            compact('usuarios', 'status'));
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
