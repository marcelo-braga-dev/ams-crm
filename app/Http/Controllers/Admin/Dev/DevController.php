<?php

namespace App\Http\Controllers\Admin\Dev;

use App\Http\Controllers\Controller;
use App\Models\Dev;
use App\Services\Dev\DadosCardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevController extends Controller
{
    public function index()
    {
        $dados = (new DadosCardService())->get();

        return Inertia::render('Admin/Dev/Index', compact('dados'));
    }

    public function show($id)
    {

    }

    public function create()
    {
        $dataAtual = date(now());

        return Inertia::render('Admin/Dev/Create', compact('dataAtual'));
    }

    public function store(Request $request)
    {
        (new Dev())->create($request);

        modalSucesso('Ação realzada com sucesso!');
        return redirect()->route('admin.dev.index');
    }
}
