<?php

namespace App\Http\Controllers\Geral\Usuarios;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersOnlineHistorico;
use App\Services\Usuarios\DadosUsuariosService;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    public function setUltimoLogin()
    {
        (new UsersOnlineHistorico())->create();
    }
}
