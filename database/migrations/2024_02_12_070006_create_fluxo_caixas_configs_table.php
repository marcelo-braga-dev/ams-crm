<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('fluxo_caixas_configs', function (Blueprint $table) {
            $table->id();
            $table->string('chave');
            $table->string('valor');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fluxo_caixas_configs');
    }
};
