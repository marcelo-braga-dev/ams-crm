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
        Schema::create('ferramentas_tarefas_itens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tarefa_id');
            $table->string('status', 32);
            $table->string('texto', 512);
            $table->timestamps();

            $table->foreign('tarefa_id')->references('id')->on('ferramentas_tarefas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ferramentas_tarefas_itens');
    }
};
