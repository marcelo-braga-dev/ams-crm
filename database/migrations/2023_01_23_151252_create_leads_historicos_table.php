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
        Schema::create('leads_historicos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('lead_id');
            $table->unsignedBigInteger('pedido_id')->nullable();
            $table->string('status', 32);
            $table->string('meio_contato', 32)->nullable();
            $table->string('msg')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('pedido_id')->references('id')->on('pedidos');
            $table->foreign('lead_id')->references('id')->on('leads');
            $table->index('user_id');
            $table->index('pedido_id');
            $table->index('lead_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('leads_historicos');
    }
};
