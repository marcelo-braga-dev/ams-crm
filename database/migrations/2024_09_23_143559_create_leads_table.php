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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('cnpj')->nullable()->unique();
            $table->bigInteger('cpf')->nullable()->unique();
            $table->unsignedBigInteger('vendedor_id')->nullable();
            $table->unsignedBigInteger('status_id');
            $table->unsignedBigInteger('setor_id');
            $table->timestamps();

            $table->foreign('setor_id')->references('id')->on('setores');
            $table->foreign('vendedor_id')->references('id')->on('users');
            $table->index(['status_id', 'vendedor_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
