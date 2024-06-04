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
        Schema::create('sac_anexos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sac_mensagens_id');
            $table->string('url');
            $table->string('mime')->nullable();
            $table->timestamps();

            $table->foreign('sac_mensagens_id')->references('id')->on('sac_mensagens');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sac_anexos');
    }
};
