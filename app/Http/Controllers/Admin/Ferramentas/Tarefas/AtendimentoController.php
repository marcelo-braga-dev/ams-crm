<?php

namespace App\Http\Controllers\Admin\Ferramentas\Tarefas;

use App\Http\Controllers\Controller;
use App\Models\FerramentasTarefas;
use App\Models\FerramentasTarefasItens;
use App\src\Ferramentas\Tarefas\Status\AprovacaoStatusTarefa;
use App\src\Ferramentas\Tarefas\Status\AtendimentoStatusTarefa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function show($id, Request $request)
    {
        $dados = (new FerramentasTarefas())->find($id);
        $tarefas = (new FerramentasTarefasItens())->get($id);

        return Inertia::render('Admin/Ferramentas/Tarefas/Status/Atendimento',
            compact('dados', 'tarefas'));
    }

    public function update($id)
    {
        (new FerramentasTarefas())->avancarStatus($id, (new AprovacaoStatusTarefa())->status());

        return redirect()->route('admin.ferramentas.tarefas.aprovacao.show', $id);
    }
}
