<?php

use App\Http\Controllers\Admin\Ferramentas\Whatsapp\ContatoWhatsappController;
use Illuminate\Support\Facades\Route;

Route::name('auth.ferramentas.whatsapp.')
    ->prefix('ferramentas/whatsapp')
    ->group(function () {
        Route::resource('contato', ContatoWhatsappController::class);

        Route::name('api.')
            ->prefix('api')
            ->group(function () {

                Route::name('contato.')
                    ->prefix('contato')
                    ->group(function () {
                        Route::get('get-all', [ContatoWhatsappController::class, 'getAll'])->name('get-all');
                    });
            });
    });
