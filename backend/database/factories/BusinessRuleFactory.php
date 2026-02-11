<?php

namespace Database\Factories;

use App\Models\BusinessRule;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BusinessRule>
 */
class BusinessRuleFactory extends Factory
{
    protected $model = BusinessRule::class;

    public function definition(): array
    {
        $type = $this->faker->randomElement(['discount', 'shipping', 'tax', 'validation', 'notification']);

        return [
            'organization_id' => Organization::query()->inRandomOrder()->value('id') ?? Organization::factory(),

            'name' => $this->faker->sentence(3),
            'description' => $this->faker->boolean(70) ? $this->faker->sentence(10) : null,

            'type' => $type,

            // ✅ Condiciones anidadas (AST)
            'conditions' => $this->nestedConditionsExample(),

            // ✅ Acciones ejemplo (contrato simple)
            'actions' => $this->actionsForType($type),

            'priority' => $this->faker->numberBetween(0, 100),
            'is_active' => $this->faker->boolean(85),

            'execution_count' => 0,
            'last_executed_at' => null,
        ];
    }

    public function active(): static
    {
        return $this->state(fn() => ['is_active' => true]);
    }

    public function ofType(string $type): static
    {
        return $this->state(fn() => ['type' => $type]);
    }

    public function forOrganization(int $organizationId): static
    {
        return $this->state(fn() => ['organization_id' => $organizationId]);
    }

    private function nestedConditionsExample(): array
    {
        // Ejemplo: cart.total >= 500 AND (customer.type == premium OR customer.vip == true)
        return [
            'op' => 'AND',
            'rules' => [
                ['field' => 'cart.total', 'operator' => '>=', 'value' => 500],
                [
                    'op' => 'OR',
                    'rules' => [
                        ['field' => 'customer.type', 'operator' => '==', 'value' => 'premium'],
                        ['field' => 'customer.vip', 'operator' => '==', 'value' => true],
                    ],
                ],
            ],
        ];
    }

    private function actionsForType(string $type): array
    {
        return match ($type) {
            'discount' => [
                ['type' => 'apply_discount', 'payload' => ['value' => 10, 'unit' => 'percentage']],
            ],
            'shipping' => [
                ['type' => 'set_shipping_method', 'payload' => ['method' => 'express']],
            ],
            'tax' => [
                ['type' => 'apply_tax', 'payload' => ['rate' => 0.18]],
            ],
            'validation' => [
                ['type' => 'block_operation', 'payload' => ['reason' => 'Regla de validación']],
            ],
            default => [
                ['type' => 'notify', 'payload' => ['channel' => 'email', 'template' => 'rule_matched']],
            ],
        };
    }
}
