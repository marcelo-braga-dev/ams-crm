<?php

namespace App\Http\Controllers\Admin\Usuarios;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MigrarController extends Controller
{
    public function index()
    {
        $dados = (new User())->getConsultores();

        return Inertia::render('Admin/Usuarios/Migrar/Index', compact('dados'));
    }

    public function store(Request $request)
    {
        try {
            (new User())->migrar($request->consultor_antigo, $request->novo_consultor);
            modalSucesso('Dados Migrado com Sucesso');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        return redirect()->back();
    }
}
