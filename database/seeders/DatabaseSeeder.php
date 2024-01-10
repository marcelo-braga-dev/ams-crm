<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Franquias;
use App\Models\Setores;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Supervisores;
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
            'email' => 'admin@example.com',
            'franquia_id' => 1,
            'setor_id' => 1,
            'password' => Hash::make('1234'),
            'tipo' => (new Admins)->getFuncao()
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Consultor User',
            'email' => 'consultor@example.com',
            'franquia_id' => 1,
            'setor_id' => 1,
            'password' => Hash::make('1234'),
            'tipo' => (new Consultores)->getFuncao()
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Supervisor User',
            'email' => 'supervisor@example.com',
            'franquia_id' => 1,
            'setor_id' => 1,
            'password' => Hash::make('1234'),
            'tipo' => (new Supervisores)->getFuncao()
        ]);
    }
}
