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
        Schema::create('pedidos_faturados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_id')->nullable();
            $table->unsignedBigInteger('exportacao_id')->nullable();
            $table->string('n_nota')->nullable();
            $table->string('data_nota')->nullable();
            $table->boolean('status')->default(false);
            $table->string('status_data')->nullable();
            $table->timestamps();

            $table->foreign('pedido_id')->references('id')->on('pedidos');
            $table->foreign('exportacao_id')->references('id')->on('pedidos_faturados_planilhas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos_faturados');
    }
};
