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
        Route::get('config', [EmailsController::class, 'config'])->name('config');
        Route::post('config', [EmailsController::class, 'updateConfig'])->name('config');
    });
