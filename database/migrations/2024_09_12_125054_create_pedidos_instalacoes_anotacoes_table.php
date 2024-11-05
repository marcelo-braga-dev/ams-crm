<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos_instalacoes_anotacoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('instalacao_id');
            $table->unsignedBigInteger('user_id');
            $table->string('titulo');
            $table->string('mensagem');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('instalacao_id')->references('id')->on('pedidos_instalacoes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos_instalacoes_anotacoes');
    }
};
