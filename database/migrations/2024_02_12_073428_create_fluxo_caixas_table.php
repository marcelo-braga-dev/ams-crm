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
            $table->unsignedBigInteger('banco_id')->nullable();
            $table->unsignedBigInteger('fornecedor_id');
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->unsignedBigInteger('franquia_id')->nullable();
            $table->string('status');
            $table->date('data');
            $table->string('tipo');
            $table->string('nota_fiscal')->nullable();
            $table->float('valor');
            $table->date('previsao_recebimento')->nullable();
            $table->date('data_vencimento')->nullable();
            $table->float('valor_baixa')->nullable();
            $table->date('data_baixa')->nullable();
            $table->text('descricao')->nullable();
            $table->integer('n_pagamento')->nullable();
            $table->integer('total_pagamentos')->nullable();
            $table->string('token', 32)->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->index('user_id');
            $table->foreign('banco_id')->references('id')->on('fluxo_caixas_configs');
            $table->index('banco_id');
            $table->foreign('fornecedor_id')->references('id')->on('fluxo_caixas_configs');
            $table->index('fornecedor_id');
            $table->foreign('empresa_id')->references('id')->on('fluxo_caixas_configs');
            $table->index('empresa_id');
            $table->foreign('franquia_id')->references('id')->on('franquias');
            $table->index('franquia_id');
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
