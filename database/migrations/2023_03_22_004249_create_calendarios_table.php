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
        Schema::create('calendarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('autor_id')->index();
            $table->unsignedBigInteger('franquia_id')->nullable();
            $table->unsignedBigInteger('setor_id')->nullable();
            $table->string('status', 32);
            $table->string('categoria', 32);
            $table->string('titulo');
            $table->string('msg');
            $table->timestamp('data');
            $table->timestamp('data_status')->nullable();
            $table->string('token')->index();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('autor_id')->references('id')->on('users');
            $table->foreign('franquia_id')->references('id')->on('franquias');
            $table->foreign('setor_id')->references('id')->on('setores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calendarios');
    }
};
