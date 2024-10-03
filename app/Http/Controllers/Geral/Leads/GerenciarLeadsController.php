<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GerenciarLeadsController extends Controller
{
    public function index()
    {
        return Inertia::render('Geral/Leads/Gerenciar/Index');
    }
}
