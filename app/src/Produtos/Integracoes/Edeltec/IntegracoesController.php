<?php

namespace App\src\Produtos\Integracoes\Edeltec;

use App\Http\Controllers\Controller;
use App\Services\IntegracoesDistribuidoras\Integracoes;
use Inertia\Inertia;

class IntegracoesController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Produtos/Integracoes/Index');
    }

    public function integrar()
    {
        $token = (new Integracoes())->autenticar();
        (new Requisicao())->get($token);

        modalSucesso('Integração realizada com sucesso!');
        return redirect()->back();
    }
}
