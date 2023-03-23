<?php

use App\Http\Controllers\Admin\Agenda\CalendarioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.agenda.')
    ->prefix('admin/agenda')
    ->group(function () {
        Route::resource('calendario', CalendarioController::class);
    });
