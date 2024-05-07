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
            $table->unsignedBigInteger('franquia_id');
            $table->unsignedBigInteger('setor_id');
            $table->unsignedBigInteger('superior_id')->nullable();
            $table->boolean('is_admin')->default(false);
            $table->unsignedBigInteger('funcao_id');
            $table->string('tipo', 32);
            $table->string('foto')->nullable();
            $table->timestamp('ultimo_login')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->index('franquia_id');
            $table->index('setor_id');
            $table->index('superior_id');
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
