<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('1234'),
            'tipo' => (new Admins)->getFuncao()
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Consultor User',
            'email' => 'consultor@example.com',
            'password' => Hash::make('1234'),
            'tipo' => (new Consultores)->getFuncao()
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Supervisor User',
            'email' => 'supervisor@example.com',
            'password' => Hash::make('1234'),
            'tipo' => (new Supervisores)->getFuncao()
        ]);
    }
}
