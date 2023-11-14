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
        Schema::create('produtos_historicos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id');
            $table->bigInteger('produtos_id');
            $table->string('nome');
            $table->integer('valor')->nullable();
            $table->integer('categoria');
            $table->integer('fornecedor');
            $table->string('status');
            $table->string('anotacoes')->nullable();
            $table->timestamp('data');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtos_historicos');
    }
};
