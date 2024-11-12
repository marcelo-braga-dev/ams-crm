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
        Schema::create('aula_modulo_cursos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('modulo_id');
            $table->string('nome');
            $table->string('anexo')->nullable();
            $table->string('anexo_tipo')->nullable();
            $table->text('conteudo')->nullable();
            $table->timestamps();

            $table->foreign('modulo_id')->references('id')->on('modulo_cursos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aula_modulo_cursos');
    }
};
