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
        Schema::create('plataformas_dados', function (Blueprint $table) {
            $table->id();
            $table->string('app_name')->nullable();
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('bg_color', 32)->default('#ffffff')->nullable();
            $table->string('primary_color', 32)->default('#000')->nullable();
            $table->string('secundary_color', 32)->default('#000')->nullable();
            $table->string('header_bgcolor', 32)->default('#ffffff')->nullable();
            $table->string('nav_bgcolor', 32)->default('#ffffff')->nullable();
            $table->string('card_bgcolor', 32)->default('#ffffff')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plataformas_dados');
    }
};
