<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $auth = auth()->user()->tipo;
    switch ($auth) {
        case (new \App\src\Usuarios\Admins())->getFuncao() :
            return redirect()->route('admin.pedidos.index');
        case (new \App\src\Usuarios\Consultores())->getFuncao() :
            return redirect()->route('consultor.pedidos.index');
        case (new \App\src\Usuarios\Supervisores())->getFuncao() :
            return redirect()->route('admin.pedidos.index');
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
