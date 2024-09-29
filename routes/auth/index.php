<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])
    ->prefix('auth')
    ->group(function () {
        require __DIR__ . '/ferramentas/index.php';
    });
