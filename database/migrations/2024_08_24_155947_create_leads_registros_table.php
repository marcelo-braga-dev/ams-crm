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
        Schema::create('leads_registros', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lead_id');
            $table->unsignedBigInteger('campo_id');
            $table->string('valor')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();

            $table->foreign('lead_id')->references('id')->on('leads');
            $table->foreign('campo_id')->references('id')->on('leads_campos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads_registros');
    }
};
