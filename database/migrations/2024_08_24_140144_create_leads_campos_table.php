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
        Schema::create('leads_campos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('franquia_id')->nullable();
            $table->string('nome');
            $table->boolean('is_requerido')->nullable();
            $table->integer('sequencia')->nullable();
            $table->boolean('is_default')->nullable();
            $table->timestamps();

            $table->foreign('franquia_id')->references('id')->on('franquias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads_campos');
    }
};
