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
        Schema::create('pedidos_arquivos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('pedidos_id');
            $table->string('chave');
            $table->string('valor')->nullable();
            $table->integer('indice')->default(1);
            $table->date('data')->nullable();
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
        Schema::dropIfExists('pedidos_arquivos');
    }
};
