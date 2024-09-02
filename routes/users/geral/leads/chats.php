<?php

use App\Http\Controllers\Geral\Chats\Whatsapp\LeadsWhatsappController;
use App\Http\Controllers\Geral\Chats\Whatsapp\WhatsappController;
use App\Http\Controllers\Geral\Leads\FunilVendasKanbanController;
use App\Http\Controllers\Geral\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

Route::name('auth.chats.')
    ->prefix('chats')
    ->group(function () {

        Route::name('whatsapp.')
            ->prefix('chats/whatsapp-api')
            ->group(function () {
                Route::post('armazenar-mensagem', [WhatsappController::class, 'armazenarEnvioMensagem'])
                    ->name('armazenar-mensagem');
            });
    });
