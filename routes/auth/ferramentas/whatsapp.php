<?php

use App\Http\Controllers\Geral\Ferramentas\Whatsapp\WhatsappController;
use Illuminate\Support\Facades\Route;

Route::name('auth.ferramentas.')
    ->prefix('ferramentas')
    ->group(function () {
        Route::resource('whatsapp', WhatsappController::class);
    });
