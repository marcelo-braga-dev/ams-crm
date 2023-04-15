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
        Schema::create('leads_importar_historicos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id');
            $table->integer('setor');
            $table->integer('qtd');
            $table->integer('id_importacao');
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
        Schema::dropIfExists('leads_importar_historicos');
    }
};
