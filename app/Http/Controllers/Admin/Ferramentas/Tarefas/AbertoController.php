<?php

namespace App\Http\Controllers\Admin\Ferramentas\Tarefas;

use App\Http\Controllers\Controller;
use App\Models\Dev;
use App\Models\DevHistoricos;
use App\Models\FerramentasTarefas;
use App\Models\FerramentasTarefasItens;
use App\src\Ferramentas\Tarefas\Status\AtendimentoStatusTarefa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbertoController extends Controller
{
    public function show($id, Request $request)
    {
        $dados = (new FerramentasTarefas())->find($id);
        $tarefas = (new FerramentasTarefasItens())->get($id);

        return Inertia::render('Admin/Ferramentas/Tarefas/Status/Aberto',
            compact('dados', 'tarefas'));
    }

    public function update($id)
    {
        (new FerramentasTarefas())->avancarStatus($id, (new AtendimentoStatusTarefa())->status());

        return redirect()->route('admin.ferramentas.tarefas.atendimento.show', $id);
    }
}
