<?php
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.supervisores'])
    ->group(function () {
        require __DIR__ . '/chamados.php';
        require __DIR__ . '/fornecedores.php';
        require __DIR__ . '/usuarios.php';
        require __DIR__ . '/pedidos.php';
        require __DIR__ . '/leads.php';
        require __DIR__ . '/notificacoes.php';
    });
