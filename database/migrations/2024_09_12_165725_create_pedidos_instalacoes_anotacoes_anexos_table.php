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
        Schema::create('pedidos_instalacoes_anotacoes_anexos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('anotacoes_id');
            $table->string('nome')->nullable();
            $table->string('url');
            $table->string('mime')->nullable();
            $table->timestamps();

            $table->foreign('anotacoes_id')->references('id')->on('pedidos_instalacoes_anotacoes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos_instalacoes_anotacoes_arquivos');
    }
};
