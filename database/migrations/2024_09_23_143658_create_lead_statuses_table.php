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
        Schema::create('lead_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cor', 32)->nullable();
            $table->integer('ordem')->unique();
            $table->integer('prazo_dias')->nullable();
            $table->boolean('status_inicial')->nullable();
            $table->timestamps();
        });

//        Schema::table('leads', function (Blueprint $table) {
//            $table->foreign('status_id')->references('id')->on('lead_statuses');
//        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lead_statuses');
    }
};
