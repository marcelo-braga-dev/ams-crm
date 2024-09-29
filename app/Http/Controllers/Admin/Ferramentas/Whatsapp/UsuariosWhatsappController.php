<?php

namespace App\Http\Controllers\Admin\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use App\Repositories\Ferramentas\Whatsapp\UsuariosWhatsappRepositories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuariosWhatsappController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Ferramentas/Whatsapp/Usuario/Index');
    }

    public function getUsuarios()
    {
        $usuarios = (new UsuariosWhatsappRepositories())->getUsuarios();

        return response()->json(compact('usuarios'));
    }

    public function store(Request $request)
    {
        (new UsuariosWhatsappRepositories())->create($request);
    }

    public function setAtivarUsuario($id)
    {
        (new UsuariosWhatsappRepositories())->ativar($id);
    }

    public function setInativarUsuario($id)
    {
        (new UsuariosWhatsappRepositories())->inativar($id);
    }
}
