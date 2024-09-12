<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])
    ->group(function () {
        require __DIR__ . '/usuarios.php';
        require __DIR__ . '/pins.php';
        require __DIR__ . '/leads/leads.php';
        require __DIR__ . '/leads/chats.php';
        require __DIR__ . '/pedidos/pedidos.php';
        require __DIR__ . '/perfil/perfil.php';
    });
