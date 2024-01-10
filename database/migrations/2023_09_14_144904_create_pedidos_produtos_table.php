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
        Schema::create('pedidos_produtos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_id');
            $table->bigInteger('fornecedores_id');
            $table->bigInteger('produtos_id');
            $table->string('nome');
            $table->float('preco_fornecedor')->nullable();
            $table->float('preco_venda');
            $table->integer('quantidade');
            $table->string('unidade')->nullable();
            $table->float('desconto')->nullable();
            $table->string('url_foto')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('pedidos_produtos');
    }
};
