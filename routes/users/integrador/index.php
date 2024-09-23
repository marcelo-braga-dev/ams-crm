<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.leads'])
    ->group(function () {
        require __DIR__ . '/pedidos.php';
        require __DIR__ . '/graus-vantagens.php';
        require __DIR__ . '/sac.php';
    });
