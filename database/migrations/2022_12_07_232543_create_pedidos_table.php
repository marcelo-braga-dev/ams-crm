<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('superior_id')->nullable();
            $table->unsignedBigInteger('franquia_id');
            $table->unsignedBigInteger('lead_id')->nullable();
            $table->unsignedBigInteger('cliente_id')->nullable();
            $table->unsignedBigInteger('setor_id');
            $table->unsignedBigInteger('fornecedor_id')->nullable();
            $table->string('status');
            $table->dateTime('status_data');
            $table->integer('prazo');
            $table->boolean('sac')->default(0);
            $table->float('preco_venda', 10);
            $table->float('preco_custo', 10)->nullable();
            $table->float('repasse', 10)->nullable();
            $table->float('imposto', 10)->nullable();
            $table->string('info_pedido', 1024)->nullable();
            $table->string('forma_pagamento');
            $table->integer('modelo');
            $table->string('situacao', '32')->default('novo');
            $table->string('obs')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('franquia_id');
            $table->index('setor_id');
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
