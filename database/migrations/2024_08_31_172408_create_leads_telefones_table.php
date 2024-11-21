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
        Schema::create('lead_telefones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('lead_id');
            $table->string('nome')->nullable();
            $table->unsignedBigInteger('numero');
            $table->integer('whatsapp_id')->nullable();
            $table->string('whatsapp_picture')->nullable();
            $table->boolean('status_whatsapp')->default(true);
            $table->boolean('status_telefone')->default(true);
            $table->timestamps();

            $table->foreign('lead_id')->references('id')->on('leads')->onDelete('cascade');
            $table->index(['lead_id', 'numero']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads_telefones');
    }
};
