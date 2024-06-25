<?php

namespace App\Http\Controllers\Admin\Produtos\Integracoes\Edeltec;

use App\Http\Controllers\Controller;
use App\Services\IntegracoesDistribuidoras\Integracoes;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class IntegracoesController extends Controller
{
    public function index()
    {
        $token = (new Integracoes())->autenticar();

        (new Requisicao())->get($token);

        return Inertia::render('Admin/Produtos/Integracoes/Index');
    }
}
