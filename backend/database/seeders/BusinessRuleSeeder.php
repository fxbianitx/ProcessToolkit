<?php

namespace Database\Seeders;

use App\Models\BusinessRule;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class BusinessRuleSeeder extends Seeder
{
    public function run(): void
    {
        $orgs = Organization::all();

        if ($orgs->isEmpty()) {
            $this->command?->warn('No hay organizaciones. Ejecuta OrganizationSeeder primero.');
            return;
        }

        foreach ($orgs as $org) {
            // 1) Reglas random para poblar
            BusinessRule::factory()
                ->count(10)
                ->forOrganization($org->id)
                ->create();

            // 2) Reglas fijas útiles para testing del motor

            // Descuento premium/vip
            BusinessRule::factory()
                ->forOrganization($org->id)
                ->active()
                ->ofType('discount')
                ->create([
                    'name' => 'Descuento para Premium o VIP',
                    'priority' => 90,
                    'conditions' => [
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
                    ],
                    'actions' => [
                        ['type' => 'apply_discount', 'payload' => ['value' => 15, 'unit' => 'percentage']],
                    ],
                ]);

            // Validación: bloquear si país en lista
            BusinessRule::factory()
                ->forOrganization($org->id)
                ->active()
                ->ofType('validation')
                ->create([
                    'name' => 'Bloquear países restringidos',
                    'priority' => 100,
                    'conditions' => [
                        'op' => 'AND',
                        'rules' => [
                            ['field' => 'customer.country', 'operator' => 'in', 'value' => ['KP', 'IR']],
                        ],
                    ],
                    'actions' => [
                        ['type' => 'block_operation', 'payload' => ['reason' => 'País restringido']],
                    ],
                ]);
        }
    }
}
