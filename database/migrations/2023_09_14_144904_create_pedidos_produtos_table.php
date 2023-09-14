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
            $table->bigInteger('pedidos_id');
            $table->bigInteger('fornecedores_id');
            $table->string('nome');
            $table->float('preco_fornecedor')->nullable();
            $table->float('preco_venda');
            $table->integer('quantidade');
            $table->string('unidade')->nullable();
            $table->float('desconto')->nullable();
            $table->string('url_foto')->nullable();
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
        Schema::dropIfExists('pedidos_produtos');
    }
};
