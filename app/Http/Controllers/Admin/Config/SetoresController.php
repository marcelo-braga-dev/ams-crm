<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\Franquias;
use App\Models\Setores;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SetoresController extends Controller
{
    public function index()
    {
        $dados = (new Setores())->get();

        return Inertia::render('Admin/Config/Categorias/Index', compact('dados'));
    }

    public function create()
    {
        $franquias = (new Franquias())->get();

        return Inertia::render('Admin/Config/Categorias/Create', compact('franquias'));
    }

    public function store(Request $request)
    {
        (new Setores())->create($request);

        modalSucesso('Dados Cadastrados com Sucesso!');
        return redirect()->route('admin.config.categorias.index');
    }

    public function show($id)
    {
        $dados = (new Setores())->find($id);

        return Inertia::render('Admin/Config/Categorias/Show', compact('dados'));
    }

    public function edit($id)
    {
        $dados = (new Setores())->find($id);
        $franquias = (new Franquias())->get();

        return Inertia::render('Admin/Config/Categorias/Edit', compact('dados', 'franquias'));
    }

    public function update($id, Request $request)
    {
        (new Setores())->atualizar($id, $request);

        modalSucesso('Dados Atualizado com Sucesso!');
        return redirect()->route('admin.config.categorias.index');
    }
}
