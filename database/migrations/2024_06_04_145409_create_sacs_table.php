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
        Schema::create('sacs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('pedido_id')->nullable();
            $table->string('status');
            $table->string('titulo');
            $table->string('nota')->nullable();
            $table->boolean('entrega_agendada')->nullable();
            $table->boolean('paletizado')->nullable();
            $table->boolean('avaria')->nullable();
            $table->boolean('produtos_quebrados')->nullable();
            $table->boolean('produtos_faltam')->nullable();
            $table->string('img_cte')->nullable();
            $table->string('img_entrega')->nullable();
            $table->string('img_produto')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('pedido_id')->references('id')->on('pedidos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sacs');
    }
};
