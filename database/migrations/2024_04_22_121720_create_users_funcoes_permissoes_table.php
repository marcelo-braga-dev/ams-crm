<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users_funcoes_permissoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('funcoes_id');
            $table->unsignedBigInteger('permissoes_id');
            $table->timestamps();

            $table->foreign('funcoes_id')->references('id')->on('users_funcoes');
            $table->foreign('permissoes_id')->references('id')->on('users_permissoes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_funcoes_permissoes');
    }
};
