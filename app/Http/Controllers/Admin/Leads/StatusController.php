<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\PedidosChamadosStatus;
use App\Models\Setores;
use App\Services\Leads\StatusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusController extends Controller
{
    public function index()
    {
        $categorias = (new PedidosChamadosStatus())->status();

        return Inertia::render('Admin/Leads/Status/Index',
            compact('categorias'));
    }

    public function edit($id): \Inertia\Response
    {
        $categoria = (new PedidosChamadosStatus())->statusCategoria($id);
        $setores = (new Setores())->getNomes();
        $nome = $setores[$id]['nome'] ?? '';

        return Inertia::render('Admin/Leads/Status/Edit',
            compact('categoria', 'id', 'nome'));
    }

    public function update($id, Request $request)
    {
        (new PedidosChamadosStatus())->atualizar($request->status_id, $request->valor);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function store(Request $request)
    {
        (new PedidosChamadosStatus())->create($request->categoria_id, $request->nome);
    }
}
