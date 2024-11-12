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
        Schema::create('questao_avaliacao_modulo_cursos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('avaliacao_id');
            $table->string('alternativa');
            $table->string('titulo');
            $table->timestamps();

            $table->foreign('avaliacao_id')->references('id')->on('avaliacao_modulo_cursos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questao_avaliacao_modulo_cursos');
    }
};
