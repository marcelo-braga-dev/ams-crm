<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leads_copias', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lead_id');
            $table->string('nome')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->integer('importacao_id')->nullable();
            $table->unsignedBigInteger('cnpj')->nullable();
            $table->string('rg')->nullable();
            $table->string('cpf')->nullable();
            $table->string('inscricao_estadual')->nullable();
            $table->string('razao_social')->nullable();
            $table->string('email')->nullable();
            $table->bigInteger('endereco')->nullable();
            $table->string('cnae')->nullable();
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
            $table->index('lead_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads_copias');
    }
};
