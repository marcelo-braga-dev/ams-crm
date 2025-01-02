<?php

use App\Http\Controllers\Geral\Ferramentas\Voip\VoipController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::name('auth.voip.')
    ->prefix('voip')
    ->group(function () {

        Route::post('/make-call', [VoipController::class, 'makeCall']);

        Route::post('/call-log', function (Request $request) {
            // Salvar detalhes da chamada no banco de dados
            $call = \App\Models\Call::create($request->all());
            return response()->json($call);
        });

        Route::post('/upload-recording', function (Request $request) {
            // Salvar gravação enviada pelo Asterisk
            $file = $request->file('recording');
            $path = $file->store('recordings');
            return response()->json(['path' => $path]);
        });
    });
