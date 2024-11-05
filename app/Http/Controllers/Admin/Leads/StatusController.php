<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsStatus;
use App\Models\Setores;
use App\Services\Leads\StatusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusController extends Controller
{
    public function index()
    {
        $categorias = (new LeadsStatus())->status();

        return Inertia::render('Admin/Leads/Status/Index',
            compact('categorias'));
    }

    public function edit($id): \Inertia\Response
    {
        $categoria = (new LeadsStatus())->statusCategoria($id);
        $setores = (new Setores())->getNomes();
        $nome = $setores[$id]['nome'] ?? '';

        return Inertia::render('Admin/Leads/Status/Edit',
            compact('categoria', 'id', 'nome'));
    }

    public function update($id, Request $request)
    {
        (new LeadsStatus())->atualizar($request->status_id, $request->valor);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function store(Request $request)
    {
        (new LeadsStatus())->create($request->categoria_id, $request->nome);
    }
}
