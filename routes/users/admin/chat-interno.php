<?php

use App\Http\Controllers\Admin\ChatInterno\ChatInternoController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('chat-interno', ChatInternoController::class);
        Route::get('chat-interno-mensagens', [ChatInternoController::class, 'mensagens'])
            ->name('chat-interno.mensagens');
        Route::post('chat-interno-excluir-mensagens', [ChatInternoController::class, 'excluirConversa'])
            ->name('chat-interno-excluir-mensagens');
    });
