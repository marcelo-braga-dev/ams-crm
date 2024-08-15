<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Franquias;
use App\Models\Setores;
use App\src\Usuarios\Funcoes\Admins;
use App\src\Usuarios\Funcoes\Vendedores;
use App\src\Usuarios\Funcoes\Supervisores;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        (new Franquias)->create((object)[
            'nome' => 'Franquia 1',
            'cor' => '#000',
            'cor_texto' => '#fff',
        ]);

        (new Setores())->create((object)[
            'nome' => 'Setor 1',
            'franquia' => 1,
            'modelo' => 1,
            'cor' => '#000',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@teste.com',
            'franquia_id' => 1,
            'setor_id' => 1,
            'password' => Hash::make('1234'),
            'tipo' => (new Admins)->getFuncao()
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Consultor User',
            'email' => 'consultor@teste.com',
            'franquia_id' => 1,
            'setor_id' => 1,
            'password' => Hash::make('1234'),
            'tipo' => (new Vendedores)->getFuncao()
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Supervisor User',
            'email' => 'supervisor@teste.com',
            'franquia_id' => 1,
            'setor_id' => 1,
            'password' => Hash::make('1234'),
            'tipo' => (new Supervisores)->getFuncao()
        ]);
    }
}
