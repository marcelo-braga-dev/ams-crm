<?php

use App\Http\Controllers\Admin\Emails\EmailsController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('emails', EmailsController::class);
    });

Route::name('admin.emails.')
    ->prefix('admin/email')
    ->group(function () {
        Route::post('enviar-lixeira', [EmailsController::class, 'enviarLixeira'])
            ->name('enviar-lixeira');

        Route::get('get-email', [EmailsController::class, 'getEmail'])->name('get-email');
        Route::get('config', [EmailsController::class, 'config'])->name('config');
        Route::post('config', [EmailsController::class, 'updateConfig'])->name('config');
    });
