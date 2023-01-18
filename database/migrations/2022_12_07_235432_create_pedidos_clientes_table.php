<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedidos_clientes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('pedidos_id');
            $table->string('nome')->nullable();
            $table->date('data_nascimento')->nullable();
            $table->string('razao_social')->nullable();
            $table->string('inscricao_estadual')->nullable();
            $table->string('endereco')->nullable();
            $table->string('telefone')->nullable();
            $table->string('email')->nullable();
            $table->string('cpf')->nullable();
            $table->string('rg')->nullable();
            $table->string('cnpj')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedidos_clientes');
    }
};
