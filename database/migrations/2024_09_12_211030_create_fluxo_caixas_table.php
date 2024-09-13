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
        Schema::create('fluxo_caixas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum('tipo', ['entrada', 'saida']);
            $table->enum('status', ['aberta', 'paga']);
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('franquia_id');
            $table->unsignedBigInteger('fornecedor_id');
            $table->unsignedBigInteger('origem_id');
            $table->string('descricao')->nullable();
            $table->string('nota')->nullable();
            $table->date('emissao')->nullable();
            $table->string('anexo')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('franquia_id')->references('id')->on('franquias')->onDelete('cascade');

            $table->index('tipo');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fluxo_caixas');
    }
};
