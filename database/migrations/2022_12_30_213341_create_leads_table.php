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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('setor_id');
            $table->unsignedBigInteger('cnpj')->nullable()->unique();
            $table->unsignedBigInteger('cpf')->nullable()->unique();
            $table->string('status', 32);
            $table->dateTime('status_data');
            $table->dateTime('pedido_em');
            $table->integer('classificacao');
            $table->timestamps();

            $table->index('user_id');
            $table->index('setor_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('leads');
    }
};
