<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_internos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('contato_id');
            $table->boolean('lido')->default(false);
            $table->text('mensagem')->nullable();
            $table->string('url')->nullable();
            $table->string('url_mime')->nullable();
            $table->string('categoria', 16);
            $table->string('token', 32)->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('contato_id')->references('id')->on('users');
            $table->index('user_id');
            $table->index('contato_id');
            $table->index('categoria');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_internos');
    }
};
