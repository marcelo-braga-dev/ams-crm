<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->group(function () {
        require __DIR__ . '/chamados.php';
        require __DIR__ . '/fornecedores.php';
        require __DIR__ . '/usuarios.php';
        require __DIR__ . '/pedidos.php';
        require __DIR__ . '/leads.php';
        require __DIR__ . '/notificacoes.php';
        require __DIR__ . '/emails.php';
        require __DIR__ . '/config.php';
        require __DIR__ . '/dev.php';
        require __DIR__ . '/chat-interno.php';
        require __DIR__ . '/agenda.php';
        require __DIR__ . '/metas-vendas.php';
        require __DIR__ . '/perfil.php';
        require __DIR__ . '/dashboard.php';
        require __DIR__ . '/produtos.php';
    });
