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
        Schema::create('pedidos_chamados_historicos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_id');
            $table->unsignedBigInteger('user_id');
            $table->bigInteger('chamados_id');
            $table->string('status', 32);
            $table->string('msg', 1024)->nullable();
            $table->string('anexo_1')->nullable();
            $table->string('anexo_2')->nullable();
            $table->integer('prazo')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('pedido_id')->references('id')->on('pedidos');
            $table->index('user_id');
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
        Schema::dropIfExists('pedidos_chamados_historicos');
    }
};
