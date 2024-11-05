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
        Schema::create('ferramentas_bibliotecas_dados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('biblioteca_id');
            $table->unsignedBigInteger('url');
            $table->timestamps();

            $table->foreign('biblioteca_id')->references('id')->on('ferramentas_bibliotecas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ferramentas_bibliotecas_dados');
    }
};
