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

        Schema::table('pedidos', function (Blueprint $table) {
            //            $table->foreign('user_id')->references('id')->on('users');
            //            $table->foreign('superior_id')->references('id')->on('users');
            $table->foreign('user_faturamento')->references('id')->on('users');
            $table->foreign('franquia_id')->references('id')->on('franquias');
            $table->foreign('funcao_id')->references('id')->on('users_funcoes');
            $table->foreign('lead_id')->references('id')->on('leads');
            //            $table->foreign('cliente_id')->references('id')->on('pedidos_clientes');
            $table->foreign('setor_id')->references('id')->on('setores');
            $table->foreign('fornecedor_id')->references('id')->on('fornecedores');
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('sdr_id')->references('id')->on('users');
            $table->foreign('setor_id')->references('id')->on('setores');
        });

        Schema::table('setores', function (Blueprint $table) {
            $table->foreign('franquia_id')->references('id')->on('franquias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
