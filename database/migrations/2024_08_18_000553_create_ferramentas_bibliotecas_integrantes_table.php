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
        Schema::create('ferramentas_bibliotecas_integrantes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('biblioteca_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('biblioteca_id')->references('id')->on('ferramentas_bibliotecas')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ferramentas_bibliotecas_integrantes');
    }
};
