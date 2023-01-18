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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id')->nullable();
            $table->string('status', 32);
            $table->string('status_anotacoes')->nullable();
            $table->string('nome')->nullable();
            $table->string('empresa');
            $table->string('razao_social')->nullable();
            $table->string('cnpj')->nullable();
            $table->string('telefone')->nullable();
            $table->integer('localidade')->nullable();
            $table->timestamp('status_data');
            $table->string('meio_contato')->nullable();
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
        Schema::dropIfExists('leads');
    }
};
