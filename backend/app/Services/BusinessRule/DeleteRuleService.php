<?php

namespace App\Services\BusinessRule;

use App\Models\BusinessRule;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DeleteRuleService
{
    //! Eliminar (soft delete) una regla de negocio dentro de una organización
    public function handle(User $admin, Organization $organization, BusinessRule $rule): void
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar que la regla pertenezca a la organización indicada
        if ($rule->organization_id !== $organization->id) {
            throw new \DomainException('Regla inválida para esta organización.');
        }

        // Ejecutar eliminación dentro de transacción para garantizar consistencia
        DB::transaction(function () use ($rule) {

            // Realizar soft delete de la regla
            $rule->delete();
        });
    }
}
