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
        Schema::create('metas_vendas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('chave');
            $table->integer('ano');
            $table->float('jan', 12, 3)->default(0);
            $table->float('fev', 12, 3)->default(0);
            $table->float('mar', 12, 3)->default(0);
            $table->float('abr', 12, 3)->default(0);
            $table->float('mai', 12, 3)->default(0);
            $table->float('jun', 12, 3)->default(0);
            $table->float('jul', 12, 3)->default(0);
            $table->float('ago', 12, 3)->default(0);
            $table->float('set', 12, 3)->default(0);
            $table->float('out', 12, 3)->default(0);
            $table->float('nov', 12, 3)->default(0);
            $table->float('dez', 12, 3)->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('metas_vendas');
    }
};
