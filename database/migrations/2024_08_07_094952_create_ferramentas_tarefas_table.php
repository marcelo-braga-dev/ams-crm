<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ferramentas_tarefas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('setor_id')->nullable();
            $table->string('status', 32);
            $table->string('area', 32);
            $table->string('prioridade', 32);
            $table->string('titulo');
            $table->string('descricao')->nullable();
            $table->string('anotacoes')->nullable();
            $table->integer('sequencia')->nullable();
            $table->timestamp('data_prazo_inicial')->nullable();
            $table->timestamp('data_prazo_final')->nullable();
            $table->float('valor_inicial')->nullable();
            $table->float('valor_final')->nullable();
            $table->string('status_pagamento', 16)->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('setor_id')->references('id')->on('setores');
            $table->index('user_id');
            $table->index('setor_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ferramentas_tarefas');
    }
};
