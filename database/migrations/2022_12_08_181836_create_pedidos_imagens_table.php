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
        Schema::create('pedidos_imagens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_id');
            $table->string('url_orcamento')->nullable();
            $table->string('url_rg')->nullable();
            $table->string('url_cpf')->nullable();
            $table->string('url_cnh')->nullable();
            $table->string('url_comprovante_residencia')->nullable();
            $table->string('url_carta_autorizacao')->nullable();
            $table->string('url_cnpj')->nullable();
            $table->string('url_boleto')->nullable();
            $table->string('url_boleto_2')->nullable();
            $table->string('url_recibo_1')->nullable();
            $table->string('url_recibo_2')->nullable();
            $table->string('url_nota_fiscal')->nullable();
            $table->string('url_planilha_pedido')->nullable();
            $table->string('url_pagamento')->nullable();

            $table->foreign('pedido_id')->references('id')->on('pedidos');
            $table->index('pedido_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedidos_imagens');
    }
};
