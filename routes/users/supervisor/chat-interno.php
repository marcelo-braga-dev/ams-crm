<?php

use App\Http\Controllers\Supervisor\ChatInterno\ChatInternoController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('chat-interno', ChatInternoController::class);
        Route::get('chat-interno-mensagens', [ChatInternoController::class, 'mensagens'])
            ->name('chat-interno.mensagens');
    });
