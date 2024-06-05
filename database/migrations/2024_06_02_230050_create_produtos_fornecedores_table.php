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
        Schema::create('produtos_fornecedores', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->integer('setor_id')->nullable();
            $table->integer('franquia_id')->nullable();
            $table->integer('cnpj')->nullable();
            $table->string('atendente')->nullable();
            $table->integer('telefone')->nullable();
            $table->string('email')->nullable();
            $table->string('anotacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos_fornecedores');
    }
};
