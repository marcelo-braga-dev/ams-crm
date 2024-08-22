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
            $table->string('nome');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('sdr_id')->nullable();
            $table->unsignedBigInteger('setor_id');
            $table->string('status', 32)->default('novo');
            $table->integer('importacao_id')->nullable();
            $table->string('atendente')->nullable();
            $table->boolean('pessoa_juridica')->default(1);
            $table->unsignedBigInteger('cnpj')->nullable()->unique();
            $table->string('rg')->nullable();
            $table->string('cpf')->nullable();
            $table->string('inscricao_estadual')->nullable();
            $table->string('razao_social')->nullable();
            $table->string('email')->nullable();
            $table->bigInteger('endereco')->nullable();
            $table->string('telefone')->nullable();
            $table->string('cidade')->nullable();
            $table->string('estado')->nullable();
            $table->timestamp('status_data');
            $table->date('data_nascimento')->nullable();
            $table->string('meio_contato')->nullable();
            $table->string('infos')->nullable();
            $table->string('classificacao', 8)->nullable();
            $table->string('anotacoes')->nullable();
            $table->string('cnae')->nullable();
            $table->dateTime('ultimo_pedido_data')->nullable();
            $table->timestamp('data_encaminhado')->nullable();
            $table->string('capital_social')->nullable();
            $table->string('tipo')->nullable();
            $table->string('porte')->nullable();
            $table->string('atividade_principal')->nullable();
            $table->string('natureza_juridica')->nullable();
            $table->string('quadro_societario')->nullable();
            $table->string('situacao')->nullable();
            $table->string('data_situacao')->nullable();
            $table->string('data_abertura')->nullable();
            $table->timestamps();

            $table->index('user_id');
            $table->index('setor_id');
            $table->softDeletes();
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
