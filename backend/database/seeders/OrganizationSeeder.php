<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        // Asegura usuarios base (si no ejecutaste UserSeeder antes)
        if (User::count() < 5) {
            User::factory()->count(10)->create();
        }

        $adminUser = User::where('username', 'admin')->first()
            ?? User::factory()->admin()->create([
                'username' => 'admin',
                'email' => 'admin@example.com',
                'phone' => '900000001',
                'password' => 'admin12345',
            ]);

        $org1 = Organization::factory()->active()->peruDefaults()->create([
            'name' => 'Constructora Andina SAC',
        ]);

        $org2 = Organization::factory()->active()->peruDefaults()->create([
            'name' => 'Municipalidad Víctor Larco',
        ]);

        $org3 = Organization::factory()->create([
            'name' => 'Demo ERP Labs',
            'status' => 'active',
        ]);

        // Asignar miembros (admin + algunos usuarios)
        $this->attachMembers($org1, $adminUser);
        $this->attachMembers($org2, $adminUser);
        $this->attachMembers($org3, $adminUser);

        $orgs = Organization::factory()->count(5)->active()->create();

        foreach ($orgs as $org) {
            $this->attachMembers($org, $adminUser);
        }
    }

    private function attachMembers(Organization $org, User $adminUser): void
    {
        // Admin principal en la org
        $org->users()->syncWithoutDetaching([
            $adminUser->id => ['role' => 'admin', 'is_active' => true],
        ]);

        // Otros miembros
        $otherUsers = User::inRandomOrder()->take(4)->get();

        $pivot = [];
        foreach ($otherUsers as $u) {
            // evita duplicar el admin si sale en random
            if ($u->id === $adminUser->id) continue;

            $pivot[$u->id] = [
                'role' => collect(['manager', 'viewer'])->random(),
                'is_active' => true,
            ];
        }

        if (!empty($pivot)) {
            $org->users()->syncWithoutDetaching($pivot);
        }
    }
}
