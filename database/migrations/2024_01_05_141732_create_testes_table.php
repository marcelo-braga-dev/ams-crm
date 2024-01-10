<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        try {
//            Schema::table('users', function (Blueprint $table) {
//                $table->unsignedBigInteger('franquia')->change();
//                $table->foreign('franquia')->references('id')->on('franquias');
//                $table->index('franquia');
//                $table->renameColumn('franquia', 'franquia_id');
//
//                $table->unsignedBigInteger('setor')->change();
//                $table->foreign('setor')->references('id')->on('setores');
//                $table->index('setor');
//                $table->renameColumn('setor', 'setor_id');
//
//                $table->unsignedBigInteger('superior')->nullable()->change();
//                $table->foreign('superior')->references('id')->on('users');
//                $table->index('superior');
//                $table->renameColumn('superior', 'superior_id');
//            });

            Schema::table('pedidos', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');

//                $table->unsignedBigInteger('superior_id')->nullable()->change();
//                $table->foreign('superior_id')->references('id')->on('users');
//                $table->index('superior_id');

//                $table->unsignedBigInteger('franquia')->change();
//                $table->foreign('franquia')->references('id')->on('franquias');
//                $table->index('franquia');
//                $table->renameColumn('franquia', 'franquia_id');

//                $table->unsignedBigInteger('lead')->nullable()->change();
//                $table->foreign('lead')->references('id')->on('leads');
//                $table->index('lead');
//                $table->renameColumn('lead', 'lead_id');
//
//                $table->unsignedBigInteger('setor')->change();
//                $table->index('setor');
//                $table->foreign('setor')->references('id')->on('setores');
//                $table->renameColumn('setor', 'setor_id');

//                $table->unsignedBigInteger('fornecedor')->nullable()->change();
//                $table->index('fornecedor');
//                $table->foreign('fornecedor')->references('id')->on('fornecedores');
//                $table->renameColumn('fornecedor', 'fornecedor_id');
            });

            Schema::table('pedidos_clientes', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');

//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->index('pedido_id');
//                $table->renameColumn('pedidos_id', 'pedido_id');
            });

            Schema::table('clientes', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('leads_importar_historicos', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('comissoes', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('leads_historicos_comentarios', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');
            });

            Schema::table('pedidos_produtos', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->index('pedido_id');
//                $table->renameColumn('pedidos_id', 'pedido_id');
            });

            Schema::table('produtos_transitos', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->index('user_id');
//                $table->renameColumn('users_id', 'user_id');
            });

            Schema::table('pedidos_arquivos', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->index('pedido_id');
//                $table->renameColumn('pedidos_id', 'pedido_id');
            });

            Schema::table('pedidos_faturamentos', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
//
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->index('pedido_id');
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->renameColumn('pedidos_id', 'pedido_id');
            });

            Schema::table('produtos_historicos', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
//
//                $table->unsignedBigInteger('produtos_id')->change();
//                $table->index('produtos_id');
//                $table->foreign('produtos_id')->references('id')->on('produtos');
//                $table->renameColumn('produtos_id', 'produto_id');
            });

            Schema::table('pedidos_imagens', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->index('pedido_id');
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->renameColumn('pedidos_id', 'pedido_id');
            });

            Schema::table('pedidos_historicos', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->index('pedido_id');
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->renameColumn('pedidos_id', 'pedido_id');
//
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('pedidos_chamados', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->index('pedido_id');
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->renameColumn('pedidos_id', 'pedido_id');
            });

            Schema::table('pedidos_chamados_historicos', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->index('pedido_id');
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->renameColumn('pedidos_id', 'pedido_id');
//
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });

            Schema::table('setores', function (Blueprint $table) {
//                $table->unsignedBigInteger('franquia')->change();
//                $table->foreign('franquia')->references('id')->on('franquias');
//                $table->index('franquia_id');
//                $table->renameColumn('franquia', 'franquia_id');
            });

            Schema::table('leads', function (Blueprint $table) {
//                $table->unsignedBigInteger('setor')->change();
//                $table->index('setor_id');
//                $table->foreign('setor')->references('id')->on('setores');
//                $table->renameColumn('setor', 'setor_id');
//                $table->renameColumn('pessoa_fisica', 'pessoa_juridica');
//
//                $table->unsignedBigInteger('users_id')->nullable()->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });

            Schema::table('notificacoes', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('emails', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('calendarios', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('chat_internos', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('metas_vendas', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });

            Schema::table('leads_historicos', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->nullable()->change();
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->index('pedido_id');
//                $table->renameColumn('pedidos_id', 'pedido_id');
//
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');

//                $table->unsignedBigInteger('leads_id')->nullable()->change();
//                $table->index('lead_id');
//                $table->foreign('leads_id')->references('id')->on('leads');
//                $table->renameColumn('leads_id', 'lead_id');
            });

            Schema::table('pedidos_acompanhamentos', function (Blueprint $table) {
//                $table->unsignedBigInteger('pedidos_id')->change();
//                $table->index('pedido_id');
//                $table->foreign('pedidos_id')->references('id')->on('pedidos');
//                $table->renameColumn('pedidos_id', 'pedido_id');
//
//                $table->unsignedBigInteger('users_id')->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
            });
//
            Schema::table('devs', function (Blueprint $table) {
//                $table->unsignedBigInteger('users_id')->nullable()->change();
//                $table->index('user_id');
//                $table->foreign('users_id')->references('id')->on('users');
//                $table->renameColumn('users_id', 'user_id');
//
//                $table->unsignedBigInteger('setor')->nullable()->change();
                $table->index('setor_id');
//                $table->foreign('setor')->references('id')->on('setores');
//                $table->renameColumn('setor', 'setor_id');
            });


        } catch (\Illuminate\Database\QueryException $exception) {
            exit($exception->getMessage());
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
