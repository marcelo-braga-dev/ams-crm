<?php
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])
    ->group(function () {
        require __DIR__ . '/usuarios.php';
        require __DIR__ . '/pins.php';
    });
