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
        Schema::create('produtos_kits_solars', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('sku')->nullable();
            $table->unsignedBigInteger('inversor_id');
            $table->unsignedBigInteger('painel_id');
            $table->unsignedBigInteger('estrutura_id');
            $table->string('tipo_produto');
            $table->integer('tensao');
            $table->float('preco_compra', 10);
            $table->float('preco_venda', 10)->nullable();
            $table->text('items')->nullable();
            $table->float('potencia_kit', 8, 3);
            $table->float('potencia_inversor', 8, 3)->nullable();
            $table->integer('potencia_modulo')->nullable();
            $table->integer('fase')->nullable();
            $table->string('descricao')->nullable();
            $table->boolean('status_distribuidora');
            $table->boolean('status');
            $table->boolean('estoque_disponivel');
            $table->boolean('hibrido')->default(false);
            $table->date('estoque_disponivel_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos_kits_solars');
    }
};
