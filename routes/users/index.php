<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $funcao = auth()->user()->tipo;

    switch ($funcao) {
        case (new \App\src\Usuarios\Funcoes\Admins())->getFuncao() :
            return redirect()->route('admin.home.index');
        case (new \App\src\Usuarios\Funcoes\Vendedores())->getFuncao() :
            return redirect()->route('consultor.pedidos.index');
        case (new \App\src\Usuarios\Funcoes\Supervisores())->getFuncao() :
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
