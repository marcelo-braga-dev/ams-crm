<?php

use App\src\Usuarios\Status\AtivoStatusUsuario;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('status', 32)->default((new AtivoStatusUsuario())->getStatus());
            $table->integer('franquia');
            $table->integer('setor');
            $table->bigInteger('superior')->nullable();
            $table->string('tipo', 32);
            $table->string('foto')->nullable();
            $table->timestamp('ultimo_login')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
