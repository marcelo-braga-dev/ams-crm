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
        Schema::create('financeiros_salarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('ano');
            $table->integer('mes');
            $table->integer('competencia');

            $table->string('chave');
            $table->float('valor')->nullable();
            $table->float('margem', 8, 3)->nullable();
            $table->date('data_pagamento')->nullable();
            $table->string('status')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->index('user_id');

            $table->index('ano');
            $table->index('mes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financeiros_salarios');
    }
};
