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
        Schema::create('leads_dados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('lead_id');
            $table->unsignedBigInteger('importacao_id')->nullable();
            $table->string('nome')->nullable();
            $table->string('razao_social')->nullable();
            $table->integer('rg')->nullable();
            $table->date('data_nascimento')->nullable();
            $table->string('ie')->nullable();
            $table->string('situacao')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('lead_id')->references('id')->on('leads');
            $table->index('lead_id');
            $table->index('importacao_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads_dados');
    }
};
