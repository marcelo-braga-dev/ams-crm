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
        Schema::create('chat_internos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id');
            $table->bigInteger('destinatario');
            $table->string('status', 32);
            $table->boolean('status_chat')->default(1);
            $table->string('mensagem');
            $table->string('tipo', 16);
            $table->string('categoria', 16);
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
        Schema::dropIfExists('chat_internos');
    }
};
