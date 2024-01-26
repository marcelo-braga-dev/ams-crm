<?php

namespace App\Http\Controllers\Admin\Relatorios;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendasController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Relatorios/Index');
    }
}
