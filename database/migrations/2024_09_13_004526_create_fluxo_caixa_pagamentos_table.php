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
        Schema::create('fluxo_caixa_pagamentos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('fluxo_caixa_id');
            $table->decimal('valor',10);
            $table->date('data');
            $table->unsignedBigInteger('banco_id')->nullable();
            $table->decimal('valor_baixa',10)->nullable();
            $table->date('data_baixa')->nullable();
            $table->string('forma_pagamento')->nullable();
            $table->timestamps();

            $table->foreign('fluxo_caixa_id')->references('id')->on('fluxo_caixas')->onDelete('cascade');

            $table->index('fluxo_caixa_id');
            $table->index('data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fluxo_caixa_pagamentos');
    }
};
