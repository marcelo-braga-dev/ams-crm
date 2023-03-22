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
        Schema::create('devs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id')->nullable();
            $table->string('status', 32);
            $table->string('area', 32);
            $table->string('prioridade', 32);
            $table->string('titulo');
            $table->string('descricao')->nullable();
            $table->string('anotacoes')->nullable();
            $table->timestamp('data_prazo');
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
        Schema::dropIfExists('devs');
    }
};
