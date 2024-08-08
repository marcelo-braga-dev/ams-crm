<?php

namespace App\Http\Controllers\Consultor\Ferramentas\Tarefas;

use App\Http\Controllers\Controller;
use App\Models\FerramentasTarefas;
use App\Models\FerramentasTarefasItens;
use App\src\Ferramentas\Tarefas\Status\AprovacaoStatusTarefa;
use App\src\Ferramentas\Tarefas\Status\FinalizadoStatusTarefa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AprovacaoController extends Controller
{
    public function show($id, Request $request)
    {
        $dados = (new FerramentasTarefas())->find($id);
        $tarefas = (new FerramentasTarefasItens())->get($id);

        return Inertia::render('Consultor/Ferramentas/Tarefas/Status/Aprovacao',
            compact('dados', 'tarefas'));
    }

    public function update($id)
    {
        (new FerramentasTarefas())->avancarStatus($id, (new FinalizadoStatusTarefa())->status());

        return redirect()->route('consultor.ferramentas.tarefas.finalizado.show', $id);
    }
}
