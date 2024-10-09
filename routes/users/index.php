<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $funcao = auth()->user()->is_admin;
    $tipo = auth()->user()->tipo;

    if ($tipo == 'integrador') return redirect()->route('integrador.pedidos.pedido.index');

    if ($funcao) return redirect()->route('admin.pedidos.index');

    return redirect()->route('consultor.pedidos.index');
})->middleware(['auth', 'verified'])->name('home');

Route::any('dashboard', function () {
    return redirect('/');
});
