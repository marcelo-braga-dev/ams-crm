<?php

use App\Http\Controllers\Admin\ChatInterno\ChatInternoController;
use App\Http\Controllers\Admin\Chats\WhatsappController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('chat-interno', ChatInternoController::class);
        Route::get('chat-interno-mensagens', [ChatInternoController::class, 'mensagens'])
            ->name('chat-interno.mensagens');
        Route::post('chat-interno-excluir-mensagens', [ChatInternoController::class, 'excluirConversa'])
            ->name('chat-interno-excluir-mensagens');

        Route::post('chat-interno-excluir-aviso', [ChatInternoController::class, 'excluirAviso'])
            ->name('chat-interno-excluir-aviso');
    });

Route::name('admin.chats.')
    ->prefix('admin/chats')
    ->group(function () {
        Route::resource('whatsapp', WhatsappController::class);
    });
