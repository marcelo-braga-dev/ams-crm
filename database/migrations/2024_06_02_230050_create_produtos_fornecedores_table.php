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
            $table->bigInteger('cnpj')->nullable();
            $table->string('atendente')->nullable();
            $table->bigInteger('telefone')->nullable();
            $table->string('email')->nullable();
            $table->string('anotacoes')->nullable();
            $table->timestamps();
        });

        Schema::table('produtos', function (Blueprint $table) {
            $table->foreign('fornecedor_id')->references('id')->on('produtos_fornecedores');
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
