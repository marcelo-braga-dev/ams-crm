<?php

namespace App\Http\Controllers\Admin\Dev;

use App\Http\Controllers\Controller;
use App\Models\Dev;
use App\Models\DevHistoricos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AndamentoController extends Controller
{
    public function show($id)
    {
        $dados = (new Dev())->find($id);
        $tarefas = (new DevHistoricos())->get($id);

        return Inertia::render('Admin/Dev/Andamento/Index', compact('dados', 'tarefas'));
    }

    public function edit($id)
    {
        $dados = (new Dev())->find($id);
        $tarefas = (new DevHistoricos())->get($id);

        return Inertia::render('Admin/Dev/Andamento/Edit', compact('dados', 'tarefas'));
    }

    public function update($id, Request $request)
    {
        if ($request->avancarStatus) {
            (new Dev())->updateStatus($id, 'aprovando');
            (new Dev())->updateAndamento($id, $request);

            return redirect()->route('admin.dev.index');
        } else (new DevHistoricos())->atualizarStatus($id, $request->status);
    }
}
