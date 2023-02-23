<?php

use App\Http\Controllers\Consultor\ChatInterno\ChatInternoController;
use Illuminate\Support\Facades\Route;

Route::name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('chat-interno', ChatInternoController::class);
        Route::get('chat-interno-mensagens', [ChatInternoController::class, 'mensagens'])
            ->name('chat-interno.mensagens');
    });
