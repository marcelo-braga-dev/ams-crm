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
        Schema::create('fluxo_caixas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('banco_id')->nullable();
            $table->integer('fornecedor_id');
            $table->integer('empresa_id')->nullable();
            $table->string('status');
            $table->date('data');
            $table->string('tipo');
            $table->string('nota_fiscal');
            $table->float('valor');
            $table->date('previsao_recebimento')->nullable();
            $table->date('data_vencimento')->nullable();
            $table->float('valor_baixa')->nullable();
            $table->date('data_baixa')->nullable();
            $table->timestamps();
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
