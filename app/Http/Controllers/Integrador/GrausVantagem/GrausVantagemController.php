<?php

namespace App\Http\Controllers\Integrador\GrausVantagem;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GrausVantagemController extends Controller
{
    public function index()
    {
        return Inertia::render('Integrador/GrausVantagens/Index');
    }
}
