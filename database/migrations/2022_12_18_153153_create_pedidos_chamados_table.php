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
        Schema::create('pedidos_chamados', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('pedidos_id');
            $table->bigInteger('consultor');
            $table->bigInteger('admin');
            $table->bigInteger('cliente');
            $table->string('status', 32);
            $table->dateTime('status_data');
            $table->string('titulo');
            $table->integer('prazo')->default(0);
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
        Schema::dropIfExists('pedidos_chamados');
    }
};
