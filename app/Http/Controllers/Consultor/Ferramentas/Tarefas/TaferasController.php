<?php

namespace App\Http\Controllers\Consultor\Ferramentas\Tarefas;

use App\Http\Controllers\Controller;
use App\Models\FerramentasTarefas;
use App\Models\FerramentasTarefasItens;
use App\Models\Setores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaferasController extends Controller
{
    public function index()
    {
        $registros = (new FerramentasTarefas())->getStatus();

        return Inertia::render('Consultor/Ferramentas/Tarefas/Index', compact('registros'));
    }

    public function create()
    {
        $setores = (new Setores())->get();
        $dataAtual = (new \DateTime())->format('Y-m-d H:i:s');

        return Inertia::render('Consultor/Ferramentas/Tarefas/Create', compact('dataAtual', 'setores'));
    }

    public function store(Request $request)
    {
        (new FerramentasTarefas())->create($request);

        modalSucesso('Tarefa cadastrada com sucesso!');
        return redirect()->route('consultor.ferramentas.tarefas.index');
    }

    public function alterarStatusItem(Request $request)
    {
        (new FerramentasTarefasItens())->alterarStatus($request->id, $request->status);

        modalSucesso('Status alterado com sucesso!');
    }
}
