<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Admin principal
        User::factory()
            ->admin()
            ->create([
                'first_name' => 'Admin',
                'last_name' => 'Root',
                'username' => 'admin',
                'email' => 'admin@example.com',
                'phone' => '900000001',
                'password' => 'admin12345', // se hashea por cast
            ]);

        // 2) Usuario de prueba normal
        User::factory()->create([
            'first_name' => 'Usuario',
            'last_name' => 'Demo',
            'username' => 'userdemo',
            'email' => 'user@example.com',
            'phone' => '900000002',
            'password' => 'password123',
        ]);

        // 3) Un lote de usuarios random
        User::factory()->count(20)->create();

        // 4) Algunos no verificados
        User::factory()->count(5)->create();
    }
}
