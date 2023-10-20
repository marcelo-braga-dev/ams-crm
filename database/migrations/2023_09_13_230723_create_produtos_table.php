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
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('fornecedores_id');
            $table->string('nome');
            $table->string('descricao')->nullable();
            $table->float('preco_fornecedor')->nullable();
            $table->float('preco_venda');
            $table->integer('unidade')->nullable();
            $table->integer('estoque_local')->default(0);
            $table->integer('categoria');
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
        Schema::dropIfExists('produtos');
    }
};
