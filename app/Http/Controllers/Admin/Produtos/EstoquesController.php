<?php

namespace App\Http\Controllers\Admin\Produtos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstoquesController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Produtos/Estoques/Index');
    }
}
