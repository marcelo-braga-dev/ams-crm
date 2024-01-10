<?php

use App\Models\Pedidos;
use App\Models\PedidosClientes;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/users/auth.php';
require __DIR__ . '/users/index.php';
require __DIR__ . '/users/admin/index.php';
require __DIR__ . '/users/consultor/index.php';
require __DIR__ . '/users/geral/index.php';

Route::name('dev.')
    ->prefix('dev')
    ->group(function () {
        Route::get('atualizar-db', function () {

            $notInValues = \App\Models\PedidosAcompanhamentos::whereNotIn('pedidos_id', function ($query) {
                $query->select('id')->from('pedidos');
            })->get();

//            foreach ($notInValues as $inValue) {
//                (new \App\Models\PedidosAcompanhamentos)->newQuery()->find($inValue->id)->delete();
//            }

            print_pre($notInValues->toArray());

            print_pre('ATUALIZAR DB');
        })
            ->name('atualizar-db');
    });
