<?php

namespace App\Services\BusinessRule;

use App\Models\BusinessRule;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ToggleRuleService
{
    //! Activar o desactivar una regla dentro de una organización sin modificar su contenido
    public function handle(User $admin, Organization $organization, BusinessRule $rule, bool $isActive): BusinessRule
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar que la regla pertenezca a la organización indicada
        if ($rule->organization_id !== $organization->id) {
            throw new \DomainException('Regla inválida para esta organización.');
        }

        // Ejecutar actualización dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($rule, $isActive) {

            // Actualizar estado activo de la regla
            $rule->update([
                'is_active' => $isActive,
            ]);

            // Retornar regla actualizada
            return $rule->refresh();
        });
    }
}
