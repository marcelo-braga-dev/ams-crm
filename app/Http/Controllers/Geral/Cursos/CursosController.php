<?php

namespace App\Http\Controllers\Geral\Cursos;

use App\Http\Controllers\Controller;
use App\Models\Curso\AulaModuloCurso;
use App\Models\Curso\Curso;
use App\Models\Curso\ModuloCurso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CursosController extends Controller
{
    public function index()
    {
        $cursos = Curso::all();

        return Inertia::render('Geral/Cursos/Index/Page', compact('cursos'));
    }

    public function show($id)
    {
        $modulos = (new ModuloCurso())
            ->find($id)
            ->get();

//        print_pre($modulos);

        return Inertia::render('Geral/Cursos/Show/Page', compact('modulos'));
    }

    public function aulas(Request $request)
    {
        $moduloId = $request->input('modulo');

        $modulo = (new ModuloCurso())
            ->with(['aulas', 'avaliacoes'])
            ->find($moduloId);;

//        print_pre($modulo);

        return Inertia::render('Geral/Cursos/Show/AulasCurso', compact('modulo'));
    }
}
