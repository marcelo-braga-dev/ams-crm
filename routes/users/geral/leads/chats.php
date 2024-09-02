<?php

use App\Http\Controllers\Geral\Chats\Telefones\TelefonesController;
use App\Http\Controllers\Geral\Chats\Whatsapp\WhatsappController;
use Illuminate\Support\Facades\Route;

Route::name('auth.chats.')
    ->prefix('chats')
    ->group(function () {

        Route::name('whatsapp.')
            ->prefix('chats/whatsapp-api')
            ->group(function () {
                Route::post('enviado-mensagem', [WhatsappController::class, 'enviadoMensagem'])
                    ->name('enviado-mensagem');
            });

        Route::name('telefone.')
            ->prefix('chats/telefone-api')
            ->group(function () {
                Route::put('alterar-status/{id}', [TelefonesController::class, 'alterarStatus'])
                    ->name('alterar-status');
            });
    });
