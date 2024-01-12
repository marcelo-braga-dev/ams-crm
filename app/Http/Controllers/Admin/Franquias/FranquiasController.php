<?php

namespace App\Http\Controllers\Admin\Franquias;

use App\Http\Controllers\Controller;
use App\Models\Franquias;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FranquiasController extends Controller
{
    public function index()
    {
        $franquias = (new Franquias())->get();

        return Inertia::render('Admin/Config/Franquias/Index', compact('franquias'));
    }

    public function create()
    {
        return Inertia::render('Admin/Config/Franquias/Create');
    }

    public function store(Request $request)
    {
        (new Franquias())->create($request);

        modalSucesso('Franquia cadastrada com sucesso!');
        return redirect()->route('admin.franquias.index');
    }

    public function show($id)
    {
        $franquia = (new Franquias())->find($id);
        $usuarios = (new User())->franquias($id);

        return Inertia::render('Admin/Config/Franquias/Show',
            compact('franquia', 'usuarios'));
    }

    public function selecionaFranquia(Request $request)
    {
        session(['franquiaSelecionada' => $request->id]);
        return redirect()->back();
    }

    public function edit($id)
    {
        $franquia = (new Franquias())->find($id);

        return Inertia::render('Admin/Config/Franquias/Edit',
            compact('franquia'));
    }

    public function update($id, Request $request)
    {
        (new Franquias())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->route('admin.franquias.show', $id);
    }
}
