<?php

namespace App\Http\Controllers\Consultor\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Consultor/Home/Index');
    }
}
