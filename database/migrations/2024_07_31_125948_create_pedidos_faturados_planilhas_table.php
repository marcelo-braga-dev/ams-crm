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
        Schema::create('pedidos_faturados_planilhas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('fornecedor_id')->nullable();
            $table->string('nota_distribuidora')->nullable();
            $table->string('url');
            $table->string('anotacoes')->nullable();
            $table->timestamps();

            $table->foreign('empresa_id')->references('id')->on('financeiros_empresas');
            $table->foreign('fornecedor_id')->references('id')->on('produtos_fornecedores');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos_faturados_planilhas');
    }
};
