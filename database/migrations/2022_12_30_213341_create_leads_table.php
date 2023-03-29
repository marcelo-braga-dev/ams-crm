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
            $table->string('status', 32)->default('novo');
            $table->integer('setor');
            $table->string('nome');
            $table->string('atendente')->nullable();
            $table->boolean('pessoa_fisica')->default(1);
            $table->string('cnpj')->nullable();
            $table->string('razao_social')->nullable();
            $table->string('email')->nullable();
            $table->string('telefone')->nullable();
            $table->string('cidade')->nullable();
            $table->string('estado')->nullable();
            $table->timestamp('status_data');
            $table->string('meio_contato')->nullable();
            $table->string('infos')->nullable();
            $table->string('classificacao', 8)->nullable();
            $table->boolean('pedido_emitido')->default(0);
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
