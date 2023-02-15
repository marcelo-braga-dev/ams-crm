<?php

namespace App\Http\Controllers\Admin\Fornecedores;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\Setores;
use App\Services\Fornecedores\FornecedoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function GuzzleHttp\Promise\all;

class FornecedoresController extends Controller
{
    public function index()
    {
        $fornecedores = (new FornecedoresService())->todos();
        return Inertia::render('Admin/Fornecedores/Index', compact('fornecedores'));
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Fornecedores/Create',
            compact('setores'));
    }

    public function show($id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);

        return Inertia::render('Admin/Fornecedores/Show', compact('dados'));
    }

    public function edit(int $id)
    {
        $dados = (new Fornecedores())->getFornecedor($id);
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Fornecedores/Edit',
            compact('dados', 'setores'));
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
