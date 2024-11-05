<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Dashboards;
use App\Models\Franquias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatoriosController extends Controller
{
    public function index()
    {
        $graficos = (new Dashboards())->graficos();

        return Inertia::render('Admin/Dashboard/Relatorios/Index', compact('graficos'));
    }

    public function create()
    {
        $franquias = (new Franquias())->get();
        $graficos = (new Dashboards())->todosGraficos();

        return Inertia::render('Admin/Dashboard/Relatorios/Create',
            compact('graficos', 'franquias'));
    }

    public function store(Request $request)
    {
        (new Dashboards())->create($request);

        modalSucesso('Janela cadastrada com sucesso!');
        return redirect()->back();
    }

    public function destroy($id)
    {
        (new Dashboards())->excluir($id);

        modalSucesso('Informação excluída com sucesso!');
        return redirect()->back();
    }
}
