<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $funcao = auth()->user()->is_admin;

    if ($funcao) return redirect()->route('admin.home.index');
    return redirect()->route('consultor.home.index');

    // switch ($funcao) {
    //     case (new \App\src\Usuarios\Funcoes\Admins())->getFuncao() :

    //     case (new \App\src\Usuarios\Funcoes\Vendedores())->getFuncao() :
    //         ;
    //     default :
    //     {
    //         auth()->logout();
    //         modalErro('Função do usuário não encontrado.');
    //         return redirect('/');
    //     }
    // }
})->middleware(['auth', 'verified'])->name('home');

Route::any('dashboard', function () {
    return redirect('/');
});
