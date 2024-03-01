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
        Schema::create('financeiros_salarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('ano');
            $table->integer('mes');

            $table->float('salario_fixo')->nullable();
            $table->date('salario_fixo_pago')->nullable();
            $table->boolean('salario_fixo_status')->default(0);

            $table->float('premio')->nullable();
            $table->date('premio_pago')->nullable();
            $table->boolean('premio_status')->default(0);

            $table->float('comissao')->nullable();
            $table->date('comissao_pago')->nullable();
            $table->boolean('comissao_status')->default(0);

            $table->float('bonus')->nullable();
            $table->date('bonus_pago')->nullable();
            $table->boolean('bonus_status')->default(0);

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->index('user_id');

            $table->index('ano');
            $table->index('mes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financeiros_salarios');
    }
};
