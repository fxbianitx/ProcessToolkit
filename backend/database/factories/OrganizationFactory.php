<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Organization>
 */
class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->company();

        return [
            'name' => $name,

            // slug NO lo seteamos: lo genera booted() si está vacío.
            'slug' => null,
            'status' => 'active',

            // settings: tu accessor ya mete defaults, acá solo ponemos overrides opcionales
            'settings' => [
                'timezone' => 'America/Lima',
                'currency' => $this->faker->randomElement(['PEN', 'USD']),
                'audit_retention_days' => $this->faker->randomElement([30, 60, 90, 180]),
                'max_rules' => $this->faker->randomElement([50, 100, 200]),
            ],
        ];
    }

    public function active(): static
    {
        return $this->state(fn() => ['status' => 'active']);
    }

    public function inactive(): static
    {
        return $this->state(fn() => ['status' => 'inactive']);
    }

    public function peruDefaults(): static
    {
        return $this->state(fn() => [
            'settings' => [
                'timezone' => 'America/Lima',
                'currency' => 'PEN',
                'audit_retention_days' => 90,
                'max_rules' => 100,
            ],
        ]);
    }
}
