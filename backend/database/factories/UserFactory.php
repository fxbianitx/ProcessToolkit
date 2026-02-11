<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        $first = $this->faker->firstName();
        $last  = $this->faker->lastName();

        return [
            'code' => (string) $this->faker->unique()->numberBetween(10_000_000, 99_999_999),

            'first_name' => $first,
            'last_name' => $last,

            // username único y “limpio”
            'username' => $this->faker->unique()->userName(),

            'phone' => $this->faker->unique()->numerify('9########'), // 9 + 8 dígitos (Perú-ish)
            'date_of_birth' => $this->faker->dateTimeBetween('-45 years', '-18 years')->format('Y-m-d'),

            'profile_photo' => null,

            'email' => $this->faker->unique()->safeEmail(),
            'password' => 'password123', // hasheado por cast "hashed"

            'email_verified_at' => now(),

            'last_login_at' => null,
            'failed_login_attempts' => 0,
            'last_failed_login_at' => null,
            'locked_until' => null,

            'preferred_language' => $this->faker->randomElement(['es', 'en', 'pt']),
            'timezone' => 'America/Lima',

            // OJO: asegúrate de tener is_admin en $fillable o setéalo luego.
            'is_admin' => false,

            'remember_token' => Str::random(10),
        ];
    }

    public function admin(): static
    {
        return $this->state(fn() => [
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);
    }

    public function locked(int $minutes = 30): static
    {
        return $this->state(fn() => [
            'locked_until' => now()->addMinutes($minutes),
        ]);
    }
}
