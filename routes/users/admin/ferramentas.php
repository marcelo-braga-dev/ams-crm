<?php

use App\Http\Controllers\Admin\Ferramentas\Biblioteca\BibliotecaController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\AprovacaoController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\AtendimentoController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\FinalizadoController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\TaferasController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\AbertoController;
use App\Http\Controllers\Admin\Ferramentas\Whatsapp\UsuariosWhatsappController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.ferramentas.')
    ->prefix('admin/ferramentas')
    ->group(function () {

        Route::name('whatsapp.')
            ->prefix('whatsapp/usuario')
            ->group(function () {
                Route::resource('usuario', UsuariosWhatsappController::class);
                Route::get('api-usuario', [UsuariosWhatsappController::class, 'getUsuarios'])->name('get-usuarios');
                Route::post('api-inativar-usuario/{id}', [UsuariosWhatsappController::class, 'setInativarUsuario'])
                    ->name('inativar-usuario');
                Route::post('api-ativar-usuario/{id}', [UsuariosWhatsappController::class, 'setAtivarUsuario'])
                    ->name('ativar-usuario');
            });


        Route::resource('tarefas', TaferasController::class);
        Route::resource('bibliotecas', BibliotecaController::class);

        Route::name('tarefas.')
            ->prefix('tarefas/status')
            ->group(function () {
                Route::resource('aberto', AbertoController::class);
                Route::resource('atendimento', AtendimentoController::class);
                Route::resource('aprovacao', AprovacaoController::class);
                Route::resource('finalizado', FinalizadoController::class);

                Route::put('alterar-status-item', [TaferasController::class, 'alterarStatusItem'])->name('alterar-status-item');
                Route::delete('excluir-item/{id}', [TaferasController::class, 'excluirItem'])->name('excluir-item');
                Route::post('adicionar-mensagem', [TaferasController::class, 'adicionarMensagem'])->name('adicionar-mensagem');
            });
    });
