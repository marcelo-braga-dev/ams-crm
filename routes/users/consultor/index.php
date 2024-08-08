<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.consultores'])
    ->group(function () {
        require __DIR__ . '/chamados.php';
        require __DIR__ . '/leads.php';
        require __DIR__ . '/pedidos.php';
        require __DIR__ . '/perfil.php';
        require __DIR__ . '/notificacoes.php';
        require __DIR__ . '/chat-interno.php';
        require __DIR__ . '/produtos.php';
        require __DIR__ . '/relatorios.php';
        require __DIR__ . '/calendario.php';
        require __DIR__ . '/home.php';
        require __DIR__ . '/orcamentos.php';
        require __DIR__ . '/ferramentas.php';
    });
