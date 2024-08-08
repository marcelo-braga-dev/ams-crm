<?php

namespace App\Http\Controllers\Admin\Ferramentas\Tarefas;

use App\Http\Controllers\Controller;
use App\Models\FerramentasTarefas;
use App\Models\FerramentasTarefasItens;
use App\src\Ferramentas\Tarefas\Status\FinalizadoStatusTarefa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinalizadoController extends Controller
{
    public function show($id, Request $request)
    {
        $dados = (new FerramentasTarefas())->find($id);
        $tarefas = (new FerramentasTarefasItens())->get($id);

        return Inertia::render('Admin/Ferramentas/Tarefas/Status/Finalizado',
            compact('dados', 'tarefas'));
    }

    public function update($id)
    {

    }
}
