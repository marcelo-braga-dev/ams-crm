<?php

use App\Http\Controllers\Geral\Ferramentas\ChatInterno\ChatInternoController;
use App\Http\Controllers\Geral\Ferramentas\Whatsapp\WhatsappController;
use Illuminate\Support\Facades\Route;

Route::name('auth.ferramentas.')
    ->prefix('ferramentas')
    ->group(function () {
        Route::resource('chat-interno', ChatInternoController::class);

        Route::name('chat-interno.api.')
            ->prefix('chat-interno-api')
            ->group(function () {
                Route::post('send-message', [ChatInternoController::class, 'sendMessage'])->name('send-message');
            });
    });
