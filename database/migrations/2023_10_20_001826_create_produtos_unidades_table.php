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
        Schema::create('produtos_unidades', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->timestamps();
        });

//        Schema::table('produtos', function (Blueprint $table) {
//            $table->foreign('unidade_id')->references('id')->on('produtos_unidades');
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtos_unidades');
    }
};
