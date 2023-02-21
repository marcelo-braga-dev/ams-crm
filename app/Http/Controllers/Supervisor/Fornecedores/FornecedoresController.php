<?php

namespace App\Http\Controllers\Supervisor\Fornecedores;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Services\Fornecedores\FornecedoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FornecedoresController extends Controller
{
    public function index()
    {
        $fornecedores = (new FornecedoresService())->fornecedores(auth()->user()->setor);

        return Inertia::render('Supervisor/Fornecedores/Index', compact('fornecedores'));
    }

    public function create()
    {
        return Inertia::render('Supervisor/Fornecedores/Create');
    }

    public function show($id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Supervisor/Fornecedores/Show', compact('dados'));
    }

    public function edit(int $id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Supervisor/Fornecedores/Edit', compact('dados'));
    }

    public function store(Request $request)
    {
        (new Fornecedores())->create($request);

        modalSucesso("Fornecedor cadastrado com sucesso!");
        return redirect()->route('supervisor.fornecedores.index');
    }

    public function update($id, Request $request)
    {
        (new Fornecedores())->atualizar($id, $request);

        return redirect()->route('supervisor.fornecedores.index');
    }
}
