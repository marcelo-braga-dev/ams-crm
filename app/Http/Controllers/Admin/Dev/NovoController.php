<?php

namespace App\Http\Controllers\Admin\Dev;

use App\Http\Controllers\Controller;
use App\Models\Dev;
use App\Models\DevHistoricos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function show($id)
    {
        $dados = (new Dev())->find($id);
        $tarefas = (new DevHistoricos())->get($id);

        return Inertia::render('Admin/Dev/Novo/Index', compact('dados', 'tarefas'));
    }

    public function edit($id)
    {
        $dados = (new Dev())->find($id);
        $tarefas = (new DevHistoricos())->get($id);

        return Inertia::render('Admin/Dev/Novo/Edit', compact('dados', 'tarefas'));
    }

    public function update($id, Request $request)
    {
        (new Dev())->updateStatus($id, 'andamento');

        return redirect()->route('admin.dev.index');
    }
}
