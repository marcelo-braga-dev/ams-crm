<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $auth = auth()->user()->tipo;
    switch ($auth) {
        case (new \App\src\Usuarios\Admins())->getTipo() :
            return redirect()->route('admin.pedidos.index');// Inertia::render('Admin/Home');
        case (new \App\src\Usuarios\Consultores())->getTipo() :
            return redirect()->route('consultor.pedidos.index');// Inertia::render('Consultor/Home');
        case (new \App\src\Usuarios\Supervisores())->getTipo() :
            return redirect()->route('supervisor.pedidos.index');// Inertia::render('Supervisor/Home');
        default :
        {
            auth()->logout();
            modalErro('Função do usuário não encontrado.');
            return redirect('/');
        }
    }
})->middleware(['auth', 'verified'])->name('home');

Route::any('dashboard', function () {
    return redirect('/');
});
