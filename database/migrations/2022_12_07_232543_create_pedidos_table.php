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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id');
            $table->integer('cliente');
            $table->string('status');
            $table->dateTime('status_data');
            $table->integer('setor');
            $table->integer('prazo');
            $table->boolean('sac')->default(0);
            $table->boolean('pin')->default(0);
            $table->float('preco_venda', 10);
            $table->float('preco_custo', 10)->nullable();
            $table->string('info_pedido', 1024)->nullable();
            $table->string('forma_pagamento');
            $table->integer('fornecedor');
            $table->integer('integrador');
            $table->string('situacao', '32')->default('novo');
            $table->string('obs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedidos');
    }
};
