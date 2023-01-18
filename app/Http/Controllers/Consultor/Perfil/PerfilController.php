<?php

namespace App\Http\Controllers\Consultor\Perfil;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerfilController extends Controller
{
    public function index()
    {
        $dados = (new User())->get(auth()->id());

        return Inertia::render('Consultor/Perfil/Show', compact('dados'));
    }
}
