<?php

namespace App\Http\Controllers\Admin\Fornecedores;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function GuzzleHttp\Promise\all;

class FornecedoresController extends Controller
{
    public function index()
    {
        $fornecedores = (new Fornecedores())->newQuery()->orderByDesc('id')->get();

        return Inertia::render('Admin/Fornecedores/Index', compact('fornecedores'));
    }

    public function create()
    {
        return Inertia::render('Admin/Fornecedores/Create');
    }

    public function show($id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Admin/Fornecedores/Show', compact('dados'));
    }

    public function edit(int $id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Admin/Fornecedores/Edit', compact('dados'));
    }

    public function store(Request $request)
    {
        (new Fornecedores())->create($request);

        modalSucesso("Fornecedor cadastrado com sucesso!");
        return redirect()->route('admin.fornecedores.index');
    }

    public function update($id, Request $request)
    {
        (new Fornecedores())->atualizar($id, $request);

        return redirect()->route('admin.fornecedores.index');
    }
}
